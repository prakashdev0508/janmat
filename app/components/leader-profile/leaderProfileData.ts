import { prisma } from "@/lib/prisma";
import {
  formatNumber,
  getAvatarUrl,
  getUtcDateStart,
  getVoteCounts,
  getYesterdayUtcDateStart,
} from "@/lib/leader-metrics";
import type { LeaderProfileData } from "./types";

function calculateVoteStats(
  summary: { upvotes: number; downvotes: number; totalVotes: number; popularity: number } | null,
  votesToday: number,
  yesterdayVotes: number,
) {
  const { upvotes, downvotes, totalVotes, popularity } = getVoteCounts(summary);
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
  const today = getUtcDateStart();
  const yesterday = getYesterdayUtcDateStart();

  const leader = await prisma.leader.findUnique({
    where: { id: leaderId },
    include: {
      party: true,
      state: true,
      voteSummary: true,
      dailyVoteSummaries: {
        where: {
          date: {
            in: [today, yesterday],
          },
        },
      },
    },
  });

  if (!leader) {
    return null;
  }

  const dailyByDate = new Map(
    leader.dailyVoteSummaries.map((summary) => [summary.date.toISOString(), summary]),
  );
  const todayVotes = dailyByDate.get(today.toISOString())?.totalVotes ?? 0;
  const yesterdayVotes = dailyByDate.get(yesterday.toISOString())?.totalVotes ?? 0;
  const voteStats = calculateVoteStats(leader.voteSummary, todayVotes, yesterdayVotes);
  const neutralPercentage = Math.max(0, Number((100 - voteStats.popularity).toFixed(1)));
  const disapprovalPercentage = Number(
    (
      voteStats.totalVotes > 0 ? (voteStats.downvotes / voteStats.totalVotes) * 100 : 0
    ).toFixed(1),
  );

  const relatedWhere = {
    id: { not: leader.id },
    stateId: leader.stateId ?? undefined,
  };

  const relatedCandidates = await prisma.leaderVoteSummary.findMany({
    where: {
      leader: relatedWhere,
    },
    orderBy: [{ popularity: "desc" }, { totalVotes: "desc" }],
    take: 4,
    include: {
      leader: {
        include: {
          party: true,
          state: true,
        },
      },
    },
  });

  const relatedLeaders = relatedCandidates
    .map((candidateSummary) => {
      const candidate = candidateSummary.leader;
      return {
        id: candidate.id,
        name: candidate.name,
        partyRegion: `${candidate.party?.shortName || candidate.party?.name || "IND"} | ${
          candidate.constituency || candidate.state?.name || "India"
        }`,
        popularity: candidateSummary.popularity,
        avatarUrl: getAvatarUrl(candidate.name),
      };
    })
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
      website: "jannmat.in",
      twitter: `@${leader.name.toLowerCase().replace(/\s+/g, "")}`,
      activeSince: String(leader.termStart?.getFullYear() ?? leader.createdAt.getFullYear()),
      avatarUrl: getAvatarUrl(leader.name),
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
