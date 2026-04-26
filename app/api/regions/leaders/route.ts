import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getMemoryCached, jsonWithCache } from "@/lib/api-cache";
import {
  formatNumber,
  formatRole,
  getAvatarUrl,
  getTrend,
  getUtcDateStart,
  getYesterdayUtcDateStart,
} from "@/lib/leader-metrics";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

type SortBy = "popularity_desc" | "votes_desc" | "name_asc";

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

    const payload = await getMemoryCached(
      `regions-leaders:${q}:${state}:${partyIds.join(",")}:${sort}:${page}:${pageSize}`,
      10_000,
      async () => {
        const total = await prisma.leader.count({ where });
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const currentPage = Math.min(page, totalPages);
        const start = (currentPage - 1) * pageSize;

        const summaryOrderedRows =
          sort === "name_asc"
            ? null
            : await prisma.leaderVoteSummary.findMany({
                where: { leader: where },
                orderBy:
                  sort === "votes_desc"
                    ? [
                        { leader: { type: "asc" } },
                        { totalVotes: "desc" },
                        { popularity: "desc" },
                      ]
                    : [
                        { leader: { type: "asc" } },
                        { popularity: "desc" },
                        { totalVotes: "desc" },
                      ],
                skip: start,
                take: pageSize,
                include: {
                  leader: {
                    include: {
                      party: true,
                      state: true,
                    },
                  },
                },
              });

        const leaderRows =
          summaryOrderedRows?.map((row) => ({
            leader: row.leader,
            summary: row,
          })) ??
          (await prisma.leader.findMany({
            where,
            orderBy: [{ type: "asc" }, { name: "asc" }],
            skip: start,
            take: pageSize,
            include: {
              party: true,
              state: true,
              voteSummary: true,
            },
          })).map((leader) => ({
            leader,
            summary: leader.voteSummary,
          }));

        const leaderIds = leaderRows.map(({ leader }) => leader.id);
        const today = getUtcDateStart();
        const yesterday = getYesterdayUtcDateStart();
        const dailySummaries = leaderIds.length
          ? await prisma.leaderDailyVoteSummary.findMany({
              where: {
                leaderId: { in: leaderIds },
                date: { in: [today, yesterday] },
              },
            })
          : [];

        const dailyByLeaderAndDate = new Map(
          dailySummaries.map((summary) => [
            `${summary.leaderId}:${summary.date.toISOString()}`,
            summary,
          ]),
        );

        const items = leaderRows.map(({ leader, summary }) => {
          const todaySummary = dailyByLeaderAndDate.get(`${leader.id}:${today.toISOString()}`);
          const yesterdaySummary = dailyByLeaderAndDate.get(
            `${leader.id}:${yesterday.toISOString()}`,
          );
          const trend = getTrend(todaySummary, yesterdaySummary);

          return {
            id: leader.id,
            name: leader.name,
            role: formatRole(leader.type, leader.constituency),
            party: leader.party?.shortName || leader.party?.name || "Independent",
            region: leader.state?.name || "All India",
            avatarUrl: getAvatarUrl(leader.name),
            sentiment: summary?.popularity ?? 0,
            trendDirection: trend.trendDirection,
            trendValue: trend.trendValue,
            votesToday: formatNumber(trend.votesToday),
          };
        });

        return {
          meta: {
            page: currentPage,
            pageSize,
            total,
            totalPages,
            sort,
          },
          items,
        };
      },
    );

    return jsonWithCache(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
