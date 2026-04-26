import { prisma } from "@/lib/prisma";
import { getMemoryCached } from "@/lib/api-cache";
import { formatRole, getAvatarUrl, getUtcDateStart, getYesterdayUtcDateStart } from "@/lib/leader-metrics";
import type {
  ComparedLeader,
  ComparisonPageData,
  KeyMetricRow,
  OtherComparisonCard,
  PopularComparisonItem,
  RegionalPerformanceRow,
  SentimentBreakdown,
  TrendSeries,
} from "@/app/components/compare/types";

const WINDOW_DAYS = 8;

function getDateDaysAgo(daysAgo: number): Date {
  const today = getUtcDateStart();
  return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

function toCompactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

function toPercentDelta(todayVotes: number, yesterdayVotes: number): string {
  if (todayVotes === 0 && yesterdayVotes === 0) return "+0.0%";
  const base = Math.max(yesterdayVotes, 1);
  const delta = ((todayVotes - yesterdayVotes) / base) * 100;
  return `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`;
}

export async function getComparePageData(
  leaderOneId?: string,
  leaderTwoId?: string,
): Promise<ComparisonPageData> {
  const cacheKey = `compare-page:${leaderOneId ?? "default"}:${leaderTwoId ?? "default"}`;
  return getMemoryCached(cacheKey, 10_000, async () => {
    const today = getUtcDateStart();
    const yesterday = getYesterdayUtcDateStart();
    const trendStart = getDateDaysAgo(WINDOW_DAYS - 1);

    const topLeaders = await prisma.leaderVoteSummary.findMany({
      orderBy: [{ totalVotes: "desc" }, { popularity: "desc" }],
      take: 10,
      include: {
        leader: {
          include: {
            party: true,
          },
        },
      },
    });

    if (topLeaders.length < 2) {
      return {
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Explore Leaders", href: "/regions" },
          { label: "Compare" },
        ],
        allLeaders: [],
        selectorFields: [
          { id: "leaderOne", label: "Leader One", value: "" },
          { id: "leaderTwo", label: "Leader Two", value: "" },
        ],
        popularComparisons: [],
        leaders: [],
        trendSeries: [],
        regionalPerformance: [],
        sentimentBreakdowns: [],
        keyMetrics: [],
        otherComparisons: [],
      };
    }

    const leaderPool = topLeaders.map((entry) => entry.leader);
    const allLeaders = leaderPool.map((leader) => ({ id: leader.id, name: leader.name }));
    const fallbackLeaderOne = topLeaders[0].leaderId;
    const fallbackLeaderTwo = topLeaders[1].leaderId;
    const selectedOneId = leaderOneId && leaderPool.some((leader) => leader.id === leaderOneId)
      ? leaderOneId
      : fallbackLeaderOne;
    const selectedTwoIdRaw = leaderTwoId && leaderPool.some((leader) => leader.id === leaderTwoId)
      ? leaderTwoId
      : fallbackLeaderTwo;
    const selectedTwoId = selectedTwoIdRaw === selectedOneId ? fallbackLeaderTwo : selectedTwoIdRaw;
    const selectedIds = [selectedOneId, selectedTwoId];

    const [selectedSummaries, selectedDaily, regionalRows] = await Promise.all([
      prisma.leaderVoteSummary.findMany({
        where: { leaderId: { in: selectedIds } },
        include: {
          leader: {
            include: {
              party: true,
            },
          },
        },
      }),
      prisma.leaderDailyVoteSummary.findMany({
        where: {
          leaderId: { in: selectedIds },
          date: { gte: trendStart },
        },
        orderBy: [{ date: "asc" }],
      }),
      prisma.leaderDailyVoteSummary.findMany({
        where: {
          leaderId: { in: selectedIds },
          date: { in: [today, yesterday] },
        },
        include: {
          leader: {
            include: {
              state: true,
            },
          },
        },
      }),
    ]);

    const summaryByLeaderId = new Map(selectedSummaries.map((summary) => [summary.leaderId, summary]));
    const selectedLeaders = selectedIds
      .map((id) => summaryByLeaderId.get(id))
      .filter((value): value is NonNullable<typeof value> => Boolean(value));

    const dailyByLeaderAndDate = new Map(
      selectedDaily.map((row) => [`${row.leaderId}:${row.date.toISOString().slice(0, 10)}`, row]),
    );

    const leaders: ComparedLeader[] = selectedLeaders.map((summary, index) => {
      const todayVotes =
        dailyByLeaderAndDate.get(`${summary.leaderId}:${today.toISOString().slice(0, 10)}`)?.totalVotes ?? 0;
      const yesterdayVotes =
        dailyByLeaderAndDate.get(`${summary.leaderId}:${yesterday.toISOString().slice(0, 10)}`)?.totalVotes ?? 0;
      return {
        id: summary.leader.id,
        name: summary.leader.name,
        role: formatRole(summary.leader.type, summary.leader.constituency),
        party: summary.leader.party?.shortName || summary.leader.party?.name || "IND",
        avatarUrl: getAvatarUrl(summary.leader.name),
        sentiment: summary.popularity,
        sentimentDelta: toPercentDelta(todayVotes, yesterdayVotes),
        buttonLabel: `Vote for ${summary.leader.name.split(" ")[0]}`,
        buttonVariant: index === 0 ? "primary" : "secondary",
        partyColor: index === 0 ? "orange" : "blue",
      };
    });

    const trendSeries: TrendSeries[] = leaders.map((leader) => {
      const bars = Array.from({ length: WINDOW_DAYS }, (_, idx) => {
        const date = getDateDaysAgo(WINDOW_DAYS - 1 - idx).toISOString().slice(0, 10);
        const daily = dailyByLeaderAndDate.get(`${leader.id}:${date}`);
        if (!daily || daily.totalVotes === 0) return Math.round(leader.sentiment);
        return Math.round((daily.upvotes / daily.totalVotes) * 100);
      });
      const latest = bars[bars.length - 1] ?? 0;
      const previous = bars[bars.length - 2] ?? latest;
      return {
        label: `${leader.name} Score Progression`,
        momentumLabel: toPercentDelta(latest, previous),
        bars,
      };
    });

    const regionalMap = new Map<
      string,
      { region: string; leaderOneVotes: number; leaderTwoVotes: number }
    >();
    regionalRows.forEach((row) => {
      const region = row.leader.state?.name || "All India";
      const key = region;
      const current = regionalMap.get(key) ?? { region, leaderOneVotes: 0, leaderTwoVotes: 0 };
      if (row.leaderId === leaders[0]?.id) {
        current.leaderOneVotes += row.totalVotes;
      } else if (row.leaderId === leaders[1]?.id) {
        current.leaderTwoVotes += row.totalVotes;
      }
      regionalMap.set(key, current);
    });

    const regionalPerformance: RegionalPerformanceRow[] = Array.from(regionalMap.values())
      .sort((a, b) => b.leaderOneVotes + b.leaderTwoVotes - (a.leaderOneVotes + a.leaderTwoVotes))
      .slice(0, 5)
      .map((row) => {
        const total = Math.max(1, row.leaderOneVotes + row.leaderTwoVotes);
        return {
          region: row.region,
          leaderOneVotes: toCompactNumber(row.leaderOneVotes),
          leaderOneShare: Number(((row.leaderOneVotes / total) * 100).toFixed(1)),
          leaderTwoVotes: toCompactNumber(row.leaderTwoVotes),
          leaderTwoShare: Number(((row.leaderTwoVotes / total) * 100).toFixed(1)),
        };
      });

    const sentimentBreakdowns: SentimentBreakdown[] = leaders.map((leader) => ({
      leaderId: leader.id,
      approval: leader.sentiment,
      note: "Calculated from aggregate citizen voting sentiment.",
    }));

    const keyMetrics: KeyMetricRow[] = [
      {
        label: "Total Votes",
        leaderOneValue: toCompactNumber(summaryByLeaderId.get(leaders[0]?.id ?? "")?.totalVotes ?? 0),
        badge: "Volume",
        leaderTwoValue: toCompactNumber(summaryByLeaderId.get(leaders[1]?.id ?? "")?.totalVotes ?? 0),
      },
      {
        label: "Approval Rate",
        leaderOneValue: `${leaders[0]?.sentiment ?? 0}%`,
        badge: "Sentiment",
        leaderTwoValue: `${leaders[1]?.sentiment ?? 0}%`,
      },
      {
        label: "Upvotes",
        leaderOneValue: toCompactNumber(summaryByLeaderId.get(leaders[0]?.id ?? "")?.upvotes ?? 0),
        badge: "Support",
        leaderTwoValue: toCompactNumber(summaryByLeaderId.get(leaders[1]?.id ?? "")?.upvotes ?? 0),
      },
      {
        label: "Downvotes",
        leaderOneValue: toCompactNumber(summaryByLeaderId.get(leaders[0]?.id ?? "")?.downvotes ?? 0),
        badge: "Opposition",
        leaderTwoValue: toCompactNumber(summaryByLeaderId.get(leaders[1]?.id ?? "")?.downvotes ?? 0),
      },
    ];

    const popularComparisons: PopularComparisonItem[] = [
      [topLeaders[0], topLeaders[1]],
      [topLeaders[0], topLeaders[2]],
      [topLeaders[1], topLeaders[2]],
    ]
      .filter((pair): pair is [typeof topLeaders[number], typeof topLeaders[number]] =>
        Boolean(pair[0] && pair[1]),
      )
      .map(([one, two]) => ({
        label: `${one.leader.name} vs ${two.leader.name}`,
        leaderOneId: one.leaderId,
        leaderTwoId: two.leaderId,
      }));

    const otherComparisons: OtherComparisonCard[] = topLeaders
      .slice(0, 8)
      .reduce<OtherComparisonCard[]>((acc, current, index, arr) => {
        if (index % 2 !== 0) return acc;
        const next = arr[index + 1];
        if (!next) return acc;
        acc.push({
          title: `${current.leader.name} vs ${next.leader.name}`,
          leaderOneId: current.leaderId,
          leaderTwoId: next.leaderId,
          leaderOneAvatar: getAvatarUrl(current.leader.name),
          leaderTwoAvatar: getAvatarUrl(next.leader.name),
        });
        return acc;
      }, []);

    return {
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Explore Leaders", href: "/regions" },
        { label: "Compare" },
      ],
      allLeaders,
      selectorFields: [
        { id: "leaderOne", label: "Leader One", value: leaders[0]?.id ?? "" },
        { id: "leaderTwo", label: "Leader Two", value: leaders[1]?.id ?? "" },
      ],
      popularComparisons,
      leaders,
      trendSeries,
      regionalPerformance,
      sentimentBreakdowns,
      keyMetrics,
      otherComparisons,
    };
  });
}
