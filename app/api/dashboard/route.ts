import { VoteType } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncSupabaseUserToPrisma } from "@/lib/user-sync";
import { createClient } from "@/utils/supabase/server";
import { fallbackDashboardData } from "@/app/components/dashboard/dashboardData";
import type { DashboardData, StreakDay } from "@/app/components/dashboard/types";
import { formatRole, getAvatarUrl } from "@/lib/leader-metrics";

export const runtime = "nodejs";

function getRelativeTime(date?: Date | null): string {
  if (!date) return "No votes yet";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function getJoinedLabel(date: Date): string {
  return `Joined ${date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
}

function getStreakDays(voteDates: Date[]): { count: number; days: StreakDay[] } {
  const activeDateKeys = new Set(
    voteDates.map((date) =>
      new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
        .toISOString()
        .slice(0, 10),
    ),
  );
  const today = new Date();
  const days = Array.from({ length: 18 }, (_, index) => {
    const dayDate = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (17 - index)),
    );
    const key = dayDate.toISOString().slice(0, 10);
    return {
      day: index + 1,
      active: activeDateKeys.has(key),
      isToday: index === 17,
    };
  });

  let count = 0;
  for (let offset = 0; offset < 365; offset += 1) {
    const date = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - offset),
    );
    if (!activeDateKeys.has(date.toISOString().slice(0, 10))) break;
    count += 1;
  }

  return { count, days };
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const user = await syncSupabaseUserToPrisma(authUser, supabase);

    const userVotes = await prisma.vote.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        leader: {
          include: {
            party: true,
            state: true,
            voteSummary: true,
          },
        },
      },
    });

    const votedLeaderIds = userVotes.map((vote) => vote.leaderId);
    const [recommendationSummaries, favoriteSummaries] = await Promise.all([
      prisma.leaderVoteSummary.findMany({
        where: votedLeaderIds.length > 0 ? { leaderId: { notIn: votedLeaderIds } } : undefined,
        orderBy: [{ popularity: "desc" }, { totalVotes: "desc" }],
        take: 2,
        include: {
          leader: {
            include: {
              party: true,
              state: true,
            },
          },
        },
      }),
      votedLeaderIds.length > 0
        ? prisma.leaderVoteSummary.findMany({
            where: { leaderId: { in: votedLeaderIds } },
            orderBy: [{ popularity: "desc" }, { totalVotes: "desc" }],
            take: 3,
            include: {
              leader: {
                include: {
                  party: true,
                  state: true,
                },
              },
            },
          })
        : [],
    ]);

    const approvalVotes = userVotes.filter((vote) => vote.type === VoteType.UPVOTE).length;
    const totalVotes = userVotes.length;
    const approvalRate =
      totalVotes === 0 ? 0 : Number(((approvalVotes / totalVotes) * 100).toFixed(0));
    const latestVote = userVotes[0];
    const streak = getStreakDays(userVotes.map((vote) => vote.createdAt));

    const data: DashboardData = {
      userProfile: {
        id: user.id,
        name: user.displayName || user.name || authUser.email || "LiveVotes User",
        location: latestVote?.leader.state?.name
          ? `${latestVote.leader.state.name}, India`
          : "India",
        joinedLabel: getJoinedLabel(user.createdAt),
        streakDays: streak.count,
        totalVotes,
        approvalRate,
        lastVoteLabel: getRelativeTime(latestVote?.createdAt),
        avatarUrl: getAvatarUrl(user.displayName || user.name || authUser.email || user.id),
      },
      recommendationLeaders:
        recommendationSummaries.length > 0
          ? recommendationSummaries.map((summary) => ({
              id: summary.leader.id,
              name: summary.leader.name,
              role: formatRole(summary.leader.type, summary.leader.constituency),
              party: summary.leader.party?.shortName || summary.leader.party?.name || "IND",
              tag: summary.leader.state?.name || "Trending",
              popularity: summary.popularity,
              avatarUrl: getAvatarUrl(summary.leader.name),
            }))
          : fallbackDashboardData.recommendationLeaders,
      favoriteLeaders:
        favoriteSummaries.length > 0
          ? favoriteSummaries.map((summary) => ({
              id: summary.leader.id,
              name: summary.leader.name,
              role: `${formatRole(summary.leader.type, summary.leader.constituency)} | ${
                summary.leader.party?.shortName || summary.leader.party?.name || "IND"
              }`,
              popularity: summary.popularity,
              avatarUrl: getAvatarUrl(summary.leader.name),
            }))
          : fallbackDashboardData.favoriteLeaders,
      recentVotes:
        userVotes.length > 0
          ? userVotes.slice(0, 5).map((vote) => ({
              id: vote.id,
              leaderName: vote.leader.name,
              voteType: vote.type === VoteType.UPVOTE ? "approve" : "reject",
              timestamp: getRelativeTime(vote.createdAt),
            }))
          : fallbackDashboardData.recentVotes,
      streakDays: streak.days,
      settingsToggles: fallbackDashboardData.settingsToggles,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
