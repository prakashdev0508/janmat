import { VoteType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function formatRole(type: string, constituency?: string | null): string {
  return constituency ? `${type}, ${constituency}` : type;
}

function popularityFromVotes(votes: Array<{ type: VoteType }>): number {
  if (votes.length === 0) return 0;
  const upvotes = votes.filter((vote) => vote.type === VoteType.UPVOTE).length;
  return Number(((upvotes / votes.length) * 100).toFixed(1));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leaderId = searchParams.get("leader");

    const leaders = await prisma.leader.findMany({
      include: {
        party: true,
        votes: {
          select: {
            type: true,
          },
        },
      },
    });

    if (leaders.length === 0) {
      return NextResponse.json({ error: "No leaders found." }, { status: 404 });
    }

    const ranked = leaders
      .map((leader) => ({
        leader,
        popularity: popularityFromVotes(leader.votes),
      }))
      .sort((a, b) => {
        if (a.leader.type !== b.leader.type) {
          return a.leader.type === "MP" ? -1 : 1;
        }
        if (b.popularity !== a.popularity) {
          return b.popularity - a.popularity;
        }
        return b.leader.votes.length - a.leader.votes.length;
      });

    const preferredSelection = leaderId
      ? ranked.find((entry) => entry.leader.id === leaderId)
      : undefined;
    const featuredSelection = preferredSelection ?? ranked[0];
    const featuredLeader = featuredSelection.leader;

    const payload = {
      featuredLeader: {
        id: featuredLeader.id,
        name: featuredLeader.name,
        role: formatRole(featuredLeader.type, featuredLeader.constituency),
        party:
          featuredLeader.party?.shortName || featuredLeader.party?.name || "Independent",
        popularity: featuredSelection.popularity,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(featuredLeader.name)}`,
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
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(entry.leader.name)}`,
        })),
    };

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
