import { Prisma, VoteType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

type SortBy = "popularity_desc" | "votes_desc" | "name_asc";

type MetricTotals = {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  sentiment: number;
  votesToday: number;
};

function parseSort(sort: string | null): SortBy {
  if (sort === "votes_desc" || sort === "name_asc") {
    return sort;
  }
  return "popularity_desc";
}

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getTodayStart(): Date {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  return todayStart;
}

function getYesterdayStart(): Date {
  const yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);
  return yesterdayStart;
}

function getMetricTotals(
  allVotes: Array<{ type: VoteType; createdAt: Date }>,
): MetricTotals & { yesterdayVotes: number } {
  let upvotes = 0;
  let downvotes = 0;
  let votesToday = 0;
  let yesterdayVotes = 0;

  const todayStart = getTodayStart();
  const yesterdayStart = getYesterdayStart();

  allVotes.forEach((vote) => {
    if (vote.type === VoteType.UPVOTE) {
      upvotes += 1;
    } else {
      downvotes += 1;
    }

    if (vote.createdAt >= todayStart) {
      votesToday += 1;
    } else if (vote.createdAt >= yesterdayStart && vote.createdAt < todayStart) {
      yesterdayVotes += 1;
    }
  });

  const totalVotes = upvotes + downvotes;
  const sentiment = totalVotes === 0 ? 0 : Number(((upvotes / totalVotes) * 100).toFixed(1));

  return {
    upvotes,
    downvotes,
    totalVotes,
    sentiment,
    votesToday,
    yesterdayVotes,
  };
}

function getTrend(votesToday: number, yesterdayVotes: number): { trendDirection: "up" | "down"; trendValue: string } {
  if (votesToday >= yesterdayVotes) {
    const base = Math.max(yesterdayVotes, 1);
    const growth = ((votesToday - yesterdayVotes) / base) * 100;
    return {
      trendDirection: "up",
      trendValue: `${growth.toFixed(1)}%`,
    };
  }

  const drop = ((yesterdayVotes - votesToday) / Math.max(yesterdayVotes, 1)) * 100;
  return {
    trendDirection: "down",
    trendValue: `${drop.toFixed(1)}%`,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const state = searchParams.get("state")?.trim() ?? "all";
    const party = searchParams.get("party")?.trim() ?? "";
    const sort = parseSort(searchParams.get("sort"));
    const page = parsePositiveInt(searchParams.get("page"), DEFAULT_PAGE);
    const requestedPageSize = parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE);
    const pageSize = Math.min(requestedPageSize, MAX_PAGE_SIZE);

    const partyIds = party
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const where: Prisma.LeaderWhereInput = {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { constituency: { contains: q, mode: "insensitive" } },
                { party: { name: { contains: q, mode: "insensitive" } } },
                { party: { shortName: { contains: q, mode: "insensitive" } } },
                { state: { name: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {},
        state !== "all" ? { stateId: state } : {},
        partyIds.length > 0 ? { partyId: { in: partyIds } } : {},
      ],
    };

    const filteredLeaders = await prisma.leader.findMany({
      where,
      include: {
        party: true,
        state: true,
      },
    });

    const total = filteredLeaders.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);

    const leaderIds = filteredLeaders.map((leader) => leader.id);
    const votes = leaderIds.length
      ? await prisma.vote.findMany({
          where: {
            leaderId: {
              in: leaderIds,
            },
          },
          select: {
            leaderId: true,
            type: true,
            createdAt: true,
          },
        })
      : [];

    const votesByLeaderId = new Map<string, Array<{ type: VoteType; createdAt: Date }>>();
    votes.forEach((vote) => {
      const existing = votesByLeaderId.get(vote.leaderId) ?? [];
      existing.push({ type: vote.type, createdAt: vote.createdAt });
      votesByLeaderId.set(vote.leaderId, existing);
    });

    const ranked = filteredLeaders.map((leader) => {
      const metrics = getMetricTotals(votesByLeaderId.get(leader.id) ?? []);
      const trend = getTrend(metrics.votesToday, metrics.yesterdayVotes);
      return {
        leader,
        metrics,
        trend,
      };
    });

    ranked.sort((a, b) => {
      // Always prioritize MPs before MLAs on Regions listing.
      if (a.leader.type !== b.leader.type) {
        return a.leader.type === "MP" ? -1 : 1;
      }

      if (sort === "name_asc") {
        return a.leader.name.localeCompare(b.leader.name);
      }
      if (sort === "votes_desc") {
        return b.metrics.totalVotes - a.metrics.totalVotes;
      }
      if (b.metrics.sentiment !== a.metrics.sentiment) {
        return b.metrics.sentiment - a.metrics.sentiment;
      }
      return b.metrics.totalVotes - a.metrics.totalVotes;
    });

    const start = (currentPage - 1) * pageSize;
    const pageItems = ranked.slice(start, start + pageSize);

    const items = pageItems.map(({ leader, metrics, trend }) => ({
      id: leader.id,
      name: leader.name,
      role: `${leader.type}${leader.constituency ? `, ${leader.constituency}` : ""}`,
      party: leader.party?.shortName || leader.party?.name || "Independent",
      region: leader.state?.name || "All India",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(leader.name)}`,
      sentiment: metrics.sentiment,
      trendDirection: trend.trendDirection,
      trendValue: trend.trendValue,
      votesToday: formatNumber(metrics.votesToday),
    }));

    return NextResponse.json({
      meta: {
        page: currentPage,
        pageSize,
        total,
        totalPages,
        sort,
      },
      items,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
