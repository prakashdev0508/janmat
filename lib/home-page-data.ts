import { prisma } from "@/lib/prisma";
import { getMemoryCached } from "@/lib/api-cache";
import {
  footerGroups,
  howItWorksSteps,
  leaders as fallbackLeaders,
  stateChips as fallbackStateChips,
  stats as fallbackStats,
} from "@/app/components/home/homeData";
import type { FooterGroup, Leader, StatItem, StepItem } from "@/app/components/home/homeData";
import {
  formatNumber,
  formatRole,
  getAvatarUrl,
  getTrend,
  getUtcDateStart,
  getYesterdayUtcDateStart,
} from "@/lib/leader-metrics";

export type HomePageData = {
  leaders: Leader[];
  stateChips: string[];
  stats: StatItem[];
  howItWorksSteps: StepItem[];
  footerGroups: FooterGroup[];
};

export const fallbackHomePageData: HomePageData = {
  leaders: fallbackLeaders,
  stateChips: fallbackStateChips,
  stats: fallbackStats,
  howItWorksSteps,
  footerGroups,
};

export async function getHomePageData(): Promise<HomePageData> {
  const today = getUtcDateStart();
  const yesterday = getYesterdayUtcDateStart();

  const [topSummaries, leaderCount, stateCount, voteTotals, todaysVoteTotals, states] =
    await Promise.all([
      prisma.leaderVoteSummary.findMany({
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
      }),
      prisma.leader.count(),
      prisma.state.count(),
      prisma.leaderVoteSummary.aggregate({
        _sum: {
          totalVotes: true,
        },
      }),
      prisma.leaderDailyVoteSummary.aggregate({
        where: { date: today },
        _sum: {
          totalVotes: true,
        },
      }),
      prisma.state.findMany({
        orderBy: [{ leaders: { _count: "desc" } }, { name: "asc" }],
        take: 6,
        select: { name: true },
      }),
    ]);

  const leaderIds = topSummaries.map((summary) => summary.leaderId);
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

  const leaders =
    topSummaries.length > 0
      ? topSummaries.map((summary) => {
          const todaySummary = dailyByLeaderAndDate.get(`${summary.leaderId}:${today.toISOString()}`);
          const yesterdaySummary = dailyByLeaderAndDate.get(
            `${summary.leaderId}:${yesterday.toISOString()}`,
          );
          const trend = getTrend(todaySummary, yesterdaySummary);
          const partyLabel =
            summary.leader.party?.shortName || summary.leader.party?.name || "IND";

          return {
            id: summary.leader.id,
            name: summary.leader.name,
            role: `${formatRole(summary.leader.type, summary.leader.constituency)} | ${partyLabel}`,
            avatarUrl: getAvatarUrl(summary.leader.name),
            trend: trend.trendDirection,
            trendDelta: trend.trendValue,
            popularity: summary.popularity,
            votesToday: `${formatNumber(trend.votesToday)} Votes Today`,
          };
        })
      : fallbackLeaders;

  return {
    leaders,
    stateChips:
      states.length > 0
        ? [...states.map((state) => state.name), "More States..."]
        : fallbackStateChips,
    stats: [
      {
        icon: "users",
        value: formatNumber(voteTotals._sum.totalVotes ?? 0),
        label: "Total Votes Cast",
      },
      {
        icon: "activity",
        value: formatNumber(todaysVoteTotals._sum.totalVotes ?? 0),
        label: "Votes Today",
      },
      {
        icon: "map",
        value: formatNumber(stateCount),
        label: "Regions Covered",
      },
      {
        icon: "user-check",
        value: formatNumber(leaderCount),
        label: "Leaders Tracked",
      },
    ],
    howItWorksSteps,
    footerGroups,
  };
}

export function getCachedHomePageData(): Promise<HomePageData> {
  return getMemoryCached("home-page-data", 10_000, getHomePageData);
}
