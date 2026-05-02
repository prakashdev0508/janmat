import { describe, expect, it } from "vitest";
import { getTrend, getUtcDateStart, getYesterdayUtcDateStart } from "@/lib/leader-metrics";

describe("lib/leader-metrics", () => {
  it("calculates upward trend and growth value", () => {
    const trend = getTrend({ totalVotes: 20 }, { totalVotes: 10 });
    expect(trend.trendDirection).toBe("up");
    expect(trend.trendValue).toBe("100.0%");
    expect(trend.votesToday).toBe(20);
  });

  it("calculates downward trend and drop value", () => {
    const trend = getTrend({ totalVotes: 15 }, { totalVotes: 30 });
    expect(trend.trendDirection).toBe("down");
    expect(trend.trendValue).toBe("50.0%");
  });

  it("handles no-vote baseline without division by zero", () => {
    const trend = getTrend({ totalVotes: 0 }, { totalVotes: 0 });
    expect(trend.trendDirection).toBe("up");
    expect(trend.trendValue).toBe("0.0%");
  });

  it("returns UTC date boundaries", () => {
    const date = new Date("2026-04-28T18:12:10.000Z");
    const utcStart = getUtcDateStart(date);
    const yesterday = getYesterdayUtcDateStart(date);

    expect(utcStart.toISOString()).toBe("2026-04-28T00:00:00.000Z");
    expect(yesterday.toISOString()).toBe("2026-04-27T00:00:00.000Z");
  });
});
