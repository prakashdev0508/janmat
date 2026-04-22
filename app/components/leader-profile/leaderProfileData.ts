import { VoteType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { LeaderProfileData } from "./types";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getTodayStart(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function getYesterdayStart(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function calculateVoteStats(votes: Array<{ type: VoteType; createdAt: Date }>) {
  const todayStart = getTodayStart();
  const yesterdayStart = getYesterdayStart();
  let upvotes = 0;
  let downvotes = 0;
  let votesToday = 0;
  let yesterdayVotes = 0;

  votes.forEach((vote) => {
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
  const popularity = totalVotes > 0 ? Number(((upvotes / totalVotes) * 100).toFixed(1)) : 0;
  const changeBase = Math.max(yesterdayVotes, 1);
  const delta = ((votesToday - yesterdayVotes) / changeBase) * 100;

  return {
    upvotes,
    downvotes,
    totalVotes,
    popularity,
    votesToday,
    popularityDelta: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`,
  };
}

export async function getLeaderProfileData(leaderId: string): Promise<LeaderProfileData | null> {
  const leader = await prisma.leader.findUnique({
    where: { id: leaderId },
    include: {
      party: true,
      state: true,
      votes: {
        select: {
          type: true,
          createdAt: true,
        },
      },
    },
  });

  if (!leader) {
    return null;
  }

  const voteStats = calculateVoteStats(leader.votes);
  const neutralPercentage = Math.max(0, Number((100 - voteStats.popularity).toFixed(1)));
  const disapprovalPercentage = Number(
    (
      voteStats.totalVotes > 0 ? (voteStats.downvotes / voteStats.totalVotes) * 100 : 0
    ).toFixed(1),
  );

  const relatedCandidates = await prisma.leader.findMany({
    where: {
      id: { not: leader.id },
      stateId: leader.stateId ?? undefined,
    },
    include: {
      party: true,
      state: true,
      votes: {
        select: {
          type: true,
          createdAt: true,
        },
      },
    },
    take: 8,
  });

  const relatedLeaders = relatedCandidates
    .map((candidate) => {
      const metrics = calculateVoteStats(candidate.votes);
      return {
        id: candidate.id,
        name: candidate.name,
        partyRegion: `${candidate.party?.shortName || candidate.party?.name || "IND"} | ${
          candidate.constituency || candidate.state?.name || "India"
        }`,
        popularity: metrics.popularity,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(candidate.name)}`,
      };
    })
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  const regionalSentiment = [
    {
      state: leader.state?.name || "All India",
      approval: voteStats.popularity,
      deltaLabel: voteStats.popularityDelta,
    },
    ...relatedLeaders.slice(0, 3).map((related) => ({
      state: related.partyRegion.split("|")[1]?.trim() || "India",
      approval: related.popularity,
      deltaLabel: "+0.0%",
    })),
  ].slice(0, 4);

  const now = new Date();
  const timeline = [
    {
      date: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      title: "Daily Sentiment Update",
      description: "Latest voting activity has been reflected in today's sentiment.",
      impactLabel: `${voteStats.popularityDelta} Change`,
      impactClass: voteStats.popularityDelta.startsWith("-")
        ? "text-red-500"
        : "text-emerald-600",
    },
    {
      date: new Date(now.getTime() - 86400000).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: "Regional Response Snapshot",
      description: "Cross-region reactions updated from recent votes.",
      impactLabel: "0.0% Stable",
      impactClass: "text-slate-500",
    },
    {
      date: new Date(now.getTime() - 2 * 86400000).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: "Engagement Pulse",
      description: "Leader engagement indicators were recalculated from total vote activity.",
      impactLabel: `${voteStats.votesToday} Votes Today`,
      impactClass: "text-emerald-600",
    },
  ];

  const partyLabel = leader.party?.shortName || leader.party?.name || "IND";
  const stateLabel = leader.state?.name || "India";

  return {
    meta: {
      id: leader.id,
      name: leader.name,
      role: `${leader.type}${leader.constituency ? `, ${leader.constituency}` : ""}`,
      party: partyLabel,
      location: `${stateLabel}, India`,
      website: "janmat.in",
      twitter: `@${leader.name.toLowerCase().replace(/\s+/g, "")}`,
      activeSince: String(leader.termStart?.getFullYear() ?? leader.createdAt.getFullYear()),
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(leader.name)}`,
    },
    popularity: voteStats.popularity,
    popularityDelta: voteStats.popularityDelta,
    approvalBreakdown: [
      {
        label: "Approval",
        value: voteStats.popularity,
        votesLabel: `${formatNumber(voteStats.upvotes)} votes`,
        colorClass: "bg-teal-500",
      },
      {
        label: "Disapproval",
        value: disapprovalPercentage,
        votesLabel: `${formatNumber(voteStats.downvotes)} votes`,
        colorClass: "bg-orange-500",
      },
      {
        label: "Neutral",
        value: neutralPercentage,
        votesLabel: "Derived",
        colorClass: "bg-slate-400",
      },
    ],
    regionalSentiment,
    votingStats: [
      { label: "Total Votes Today", value: formatNumber(voteStats.votesToday) },
      { label: "Approval Votes", value: formatNumber(voteStats.upvotes) },
      { label: "Disapproval Votes", value: formatNumber(voteStats.downvotes) },
    ],
    timeline,
    relatedLeaders,
  };
}
