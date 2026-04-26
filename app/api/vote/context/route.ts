import { NextResponse } from "next/server";
import { getMemoryCached, jsonWithCache } from "@/lib/api-cache";
import { formatRole, getAvatarUrl } from "@/lib/leader-metrics";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leaderId = searchParams.get("leader");

    const payload = await getMemoryCached(`vote-context:${leaderId ?? "top"}`, 10_000, async () => {
      const preferredSummary = leaderId
      ? await prisma.leaderVoteSummary.findUnique({
          where: { leaderId },
          include: {
            leader: {
              include: {
                party: true,
              },
            },
          },
        })
      : null;

      const topSummaries = await prisma.leaderVoteSummary.findMany({
        where: preferredSummary ? { leaderId: { not: preferredSummary.leaderId } } : undefined,
        orderBy: [{ leader: { type: "asc" } }, { popularity: "desc" }, { totalVotes: "desc" }],
        take: preferredSummary ? 4 : 5,
        include: {
          leader: {
            include: {
              party: true,
            },
          },
        },
      });

      const ranked = preferredSummary ? [preferredSummary, ...topSummaries] : topSummaries;

      if (ranked.length === 0) {
        return null;
      }

      const featuredSelection = ranked[0];
      const featuredLeader = featuredSelection.leader;

      return {
        featuredLeader: {
          id: featuredLeader.id,
          name: featuredLeader.name,
          role: formatRole(featuredLeader.type, featuredLeader.constituency),
          party:
            featuredLeader.party?.shortName || featuredLeader.party?.name || "Independent",
          popularity: featuredSelection.popularity,
          avatarUrl: getAvatarUrl(featuredLeader.name),
        },
        voteWindow: {
          title: "100% Anonymous",
          description: "Your identity is never stored with your vote.",
          availabilityLabel: "Available to vote now",
        },
        trendingLeaders: ranked
          .filter((entry) => entry.leader.id !== featuredLeader.id)
          .slice(0, 4)
          .map((entry) => ({
            id: entry.leader.id,
            name: entry.leader.name,
            role: formatRole(entry.leader.type, entry.leader.constituency),
            party: entry.leader.party?.shortName || entry.leader.party?.name || "Independent",
            popularity: entry.popularity,
            avatarUrl: getAvatarUrl(entry.leader.name),
          })),
      };
    });

    if (!payload) {
      return NextResponse.json({ error: "No leaders found." }, { status: 404 });
    }

    return jsonWithCache(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
