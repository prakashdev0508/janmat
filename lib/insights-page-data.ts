import { Prisma } from "@prisma/client";
import { getMemoryCached } from "@/lib/api-cache";
import { prisma } from "@/lib/prisma";
import { formatNumber, getUtcDateStart } from "@/lib/leader-metrics";
import { insightsAnalyticsData } from "@/app/components/insights/insightsData";
import type {
  InsightsAnalyticsData,
  LeaderMomentumItem,
  RegionalInsightItem,
  TrendPoint,
} from "@/app/components/insights/types";

type RegionalRow = {
  id: string | null;
  region: string | null;
  upvotes: number | bigint | null;
  downvotes: number | bigint | null;
  totalVotes: number | bigint | null;
};

type RegionalDailyRow = {
  id: string | null;
  todayVotes: number | bigint | null;
  yesterdayVotes: number | bigint | null;
};

type PartyGrowthRow = {
  party: string | null;
  todayVotes: number | bigint | null;
  yesterdayVotes: number | bigint | null;
};

export const fallbackInsightsPageData = insightsAnalyticsData;

function toNumber(value: number | bigint | null | undefined): number {
  return Number(value ?? 0);
}

function formatDelta(current: number, previous: number): { label: string; positive: boolean; value: number } {
  if (current === 0 && previous === 0) {
    return { label: "+0.0%", positive: true, value: 0 };
  }

  const base = Math.max(previous, 1);
  const delta = ((current - previous) / base) * 100;

  return {
    label: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`,
    positive: delta >= 0,
    value: delta,
  };
}

function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return formatNumber(value);
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

function getDateDaysAgo(daysAgo: number): Date {
  const today = getUtcDateStart();
  return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

async function getPartyGrowth(today: Date, yesterday: Date) {
  const rows = await prisma.$queryRaw<PartyGrowthRow[]>(Prisma.sql`
    SELECT
      COALESCE(p."shortName", p."name", 'IND') AS "party",
      SUM(CASE WHEN d."date" = ${today}::date THEN d."totalVotes" ELSE 0 END) AS "todayVotes",
      SUM(CASE WHEN d."date" = ${yesterday}::date THEN d."totalVotes" ELSE 0 END) AS "yesterdayVotes"
    FROM "LeaderDailyVoteSummary" d
    JOIN "Leader" l ON l."id" = d."leaderId"
    LEFT JOIN "Party" p ON p."id" = l."partyId"
    WHERE d."date" IN (${today}::date, ${yesterday}::date)
    GROUP BY p."id", p."shortName", p."name"
    ORDER BY "todayVotes" DESC
    LIMIT 8
  `);

  return rows
    .map((row) => {
      const todayVotes = toNumber(row.todayVotes);
      const yesterdayVotes = toNumber(row.yesterdayVotes);
      return {
        party: row.party ?? "IND",
        ...formatDelta(todayVotes, yesterdayVotes),
      };
    })
    .sort((a, b) => b.value - a.value)[0];
}

async function getTrendSeries(): Promise<TrendPoint[]> {
  const startDate = getDateDaysAgo(11);
  const dailyRows = await prisma.leaderDailyVoteSummary.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: startDate,
      },
    },
    _sum: {
      upvotes: true,
      totalVotes: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const sentimentByDate = new Map(
    dailyRows.map((row) => {
      const totalVotes = row._sum.totalVotes ?? 0;
      const value =
        totalVotes === 0 ? 0 : Number((((row._sum.upvotes ?? 0) / totalVotes) * 100).toFixed(1));
      return [row.date.toISOString().slice(0, 10), value];
    }),
  );

  return Array.from({ length: 12 }, (_, index) => {
    const date = getDateDaysAgo(11 - index);
    return {
      label: formatDayLabel(date),
      value: sentimentByDate.get(date.toISOString().slice(0, 10)) ?? 0,
    };
  });
}

async function getRegionalInsights(today: Date, yesterday: Date): Promise<RegionalInsightItem[]> {
  const [regionalRows, dailyRows] = await Promise.all([
    prisma.$queryRaw<RegionalRow[]>(Prisma.sql`
      SELECT
        st."id" AS "id",
        st."name" AS "region",
        SUM(s."upvotes") AS "upvotes",
        SUM(s."downvotes") AS "downvotes",
        SUM(s."totalVotes") AS "totalVotes"
      FROM "LeaderVoteSummary" s
      JOIN "Leader" l ON l."id" = s."leaderId"
      LEFT JOIN "State" st ON st."id" = l."stateId"
      GROUP BY st."id", st."name"
      ORDER BY "totalVotes" DESC
      LIMIT 4
    `),
    prisma.$queryRaw<RegionalDailyRow[]>(Prisma.sql`
      SELECT
        st."id" AS "id",
        SUM(CASE WHEN d."date" = ${today}::date THEN d."totalVotes" ELSE 0 END) AS "todayVotes",
        SUM(CASE WHEN d."date" = ${yesterday}::date THEN d."totalVotes" ELSE 0 END) AS "yesterdayVotes"
      FROM "LeaderDailyVoteSummary" d
      JOIN "Leader" l ON l."id" = d."leaderId"
      LEFT JOIN "State" st ON st."id" = l."stateId"
      WHERE d."date" IN (${today}::date, ${yesterday}::date)
      GROUP BY st."id"
    `),
  ]);

  const dailyByRegion = new Map(
    dailyRows.map((row) => [
      row.id ?? "all",
      {
        todayVotes: toNumber(row.todayVotes),
        yesterdayVotes: toNumber(row.yesterdayVotes),
      },
    ]),
  );

  return regionalRows.map((row) => {
    const totalVotes = toNumber(row.totalVotes);
    const upvotes = toNumber(row.upvotes);
    const daily = dailyByRegion.get(row.id ?? "all");

    return {
      id: row.id ?? "all",
      region: row.region ?? "All India",
      sentiment: totalVotes === 0 ? 0 : Number(((upvotes / totalVotes) * 100).toFixed(1)),
      change: formatDelta(daily?.todayVotes ?? 0, daily?.yesterdayVotes ?? 0).label,
    };
  });
}

async function getLeaderMomentum(today: Date, yesterday: Date): Promise<LeaderMomentumItem[]> {
  const summaries = await prisma.leaderVoteSummary.findMany({
    orderBy: [{ popularity: "desc" }, { totalVotes: "desc" }],
    take: 4,
    include: {
      leader: {
        include: {
          party: true,
          dailyVoteSummaries: {
            where: {
              date: { in: [today, yesterday] },
            },
          },
        },
      },
    },
  });

  return summaries.map((summary) => {
    const todayVotes =
      summary.leader.dailyVoteSummaries.find(
        (dailySummary) => dailySummary.date.toISOString() === today.toISOString(),
      )?.totalVotes ?? 0;
    const yesterdayVotes =
      summary.leader.dailyVoteSummaries.find(
        (dailySummary) => dailySummary.date.toISOString() === yesterday.toISOString(),
      )?.totalVotes ?? 0;

    return {
      id: summary.leader.id,
      name: summary.leader.name,
      party: summary.leader.party?.shortName || summary.leader.party?.name || "IND",
      score: summary.popularity,
      movement: formatDelta(todayVotes, yesterdayVotes).label,
    };
  });
}

export async function getInsightsPageData(): Promise<InsightsAnalyticsData> {
  const today = getUtcDateStart();
  const yesterday = getDateDaysAgo(1);
  const lastWeekStart = getDateDaysAgo(6);
  const previousWeekStart = getDateDaysAgo(13);

  const [
    totals,
    todayTotals,
    lastWeekTotals,
    previousWeekTotals,
    partyGrowth,
    trendSeries,
    regionalInsights,
    leaderMomentum,
  ] = await Promise.all([
    prisma.leaderVoteSummary.aggregate({
      _sum: {
        upvotes: true,
        totalVotes: true,
      },
    }),
    prisma.leaderDailyVoteSummary.aggregate({
      where: { date: today },
      _sum: { totalVotes: true },
    }),
    prisma.leaderDailyVoteSummary.aggregate({
      where: { date: { gte: lastWeekStart } },
      _sum: { totalVotes: true },
    }),
    prisma.leaderDailyVoteSummary.aggregate({
      where: { date: { gte: previousWeekStart, lt: lastWeekStart } },
      _sum: { totalVotes: true },
    }),
    getPartyGrowth(today, yesterday),
    getTrendSeries(),
    getRegionalInsights(today, yesterday),
    getLeaderMomentum(today, yesterday),
  ]);

  const totalVotes = totals._sum.totalVotes ?? 0;
  const totalUpvotes = totals._sum.upvotes ?? 0;
  const sentimentIndex =
    totalVotes === 0 ? 0 : Number(((totalUpvotes / totalVotes) * 100).toFixed(1));
  const weeklyDelta = formatDelta(
    lastWeekTotals._sum.totalVotes ?? 0,
    previousWeekTotals._sum.totalVotes ?? 0,
  );
  const todayDelta = formatDelta(todayTotals._sum.totalVotes ?? 0, 0);

  return {
    kpis: [
      {
        id: "total-votes",
        label: "Total Votes Cast",
        value: formatCompact(totalVotes),
        deltaLabel: `${weeklyDelta.label} this week`,
        positive: weeklyDelta.positive,
      },
      {
        id: "sentiment-index",
        label: "Sentiment Index",
        value: `${sentimentIndex} / 100`,
        deltaLabel: "Live from vote summaries",
        positive: sentimentIndex >= 50,
      },
      {
        id: "votes-today",
        label: "Votes Today",
        value: formatCompact(todayTotals._sum.totalVotes ?? 0),
        deltaLabel: `${todayDelta.label} today`,
        positive: todayDelta.positive,
      },
      {
        id: "top-growth",
        label: "Top Party Growth",
        value: partyGrowth ? `${partyGrowth.party} ${partyGrowth.label}` : "No data",
        deltaLabel: "Daily vote momentum",
        positive: partyGrowth?.positive ?? true,
      },
    ],
    trendSeries,
    regionalInsights:
      regionalInsights.length > 0 ? regionalInsights : fallbackInsightsPageData.regionalInsights,
    leaderMomentum:
      leaderMomentum.length > 0 ? leaderMomentum : fallbackInsightsPageData.leaderMomentum,
  };
}

export function getCachedInsightsPageData(): Promise<InsightsAnalyticsData> {
  return getMemoryCached("insights-page-data", 10_000, getInsightsPageData);
}
