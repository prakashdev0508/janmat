export type LeaderVoteSummaryLike = {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  popularity: number;
} | null;

export type DailyVoteSummaryLike = {
  totalVotes: number;
} | null | undefined;

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatRole(type: string, constituency?: string | null): string {
  return constituency ? `${type}, ${constituency}` : type;
}

export function getAvatarUrl(name: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

export function getPopularity(summary: LeaderVoteSummaryLike): number {
  return summary?.popularity ?? 0;
}

export function getVoteCounts(summary: LeaderVoteSummaryLike) {
  const upvotes = summary?.upvotes ?? 0;
  const downvotes = summary?.downvotes ?? 0;
  const totalVotes = summary?.totalVotes ?? 0;
  const popularity = summary?.popularity ?? 0;

  return {
    upvotes,
    downvotes,
    totalVotes,
    popularity,
  };
}

export function getTrend(
  today: DailyVoteSummaryLike,
  yesterday: DailyVoteSummaryLike,
): { trendDirection: "up" | "down"; trendValue: string; votesToday: number; yesterdayVotes: number } {
  const votesToday = today?.totalVotes ?? 0;
  const yesterdayVotes = yesterday?.totalVotes ?? 0;

  if (votesToday >= yesterdayVotes) {
    const base = Math.max(yesterdayVotes, 1);
    const growth = ((votesToday - yesterdayVotes) / base) * 100;
    return {
      trendDirection: "up",
      trendValue: `${growth.toFixed(1)}%`,
      votesToday,
      yesterdayVotes,
    };
  }

  const drop = ((yesterdayVotes - votesToday) / Math.max(yesterdayVotes, 1)) * 100;
  return {
    trendDirection: "down",
    trendValue: `${drop.toFixed(1)}%`,
    votesToday,
    yesterdayVotes,
  };
}

export function getUtcDateStart(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function getYesterdayUtcDateStart(date = new Date()): Date {
  const today = getUtcDateStart(date);
  return new Date(today.getTime() - 24 * 60 * 60 * 1000);
}
