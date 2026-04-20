import type { InsightsAnalyticsData } from "./types";

export const insightsAnalyticsData: InsightsAnalyticsData = {
  kpis: [
    {
      id: "total-votes",
      label: "Total Votes Cast",
      value: "24.5M",
      deltaLabel: "+1.3M this week",
      positive: true,
    },
    {
      id: "sentiment-index",
      label: "Sentiment Index",
      value: "64.8 / 100",
      deltaLabel: "+2.4 vs last week",
      positive: true,
    },
    {
      id: "active-citizens",
      label: "Daily Active Citizens",
      value: "1.2M",
      deltaLabel: "-0.5% today",
      positive: false,
    },
    {
      id: "top-growth",
      label: "Top Party Growth",
      value: "BJP +4.2%",
      deltaLabel: "Sustained 3-day climb",
      positive: true,
    },
  ],
  trendSeries: [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 48 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 51 },
    { label: "Fri", value: 62 },
    { label: "Sat", value: 68 },
    { label: "Sun", value: 74 },
    { label: "Mon", value: 72 },
    { label: "Tue", value: 66 },
    { label: "Wed", value: 70 },
    { label: "Thu", value: 77 },
    { label: "Fri", value: 84 },
  ],
  regionalInsights: [
    { id: "up", region: "Uttar Pradesh", sentiment: 71.4, change: "+1.1%" },
    { id: "mh", region: "Maharashtra", sentiment: 66.3, change: "+0.6%" },
    { id: "wb", region: "West Bengal", sentiment: 52.4, change: "-0.4%" },
    { id: "tn", region: "Tamil Nadu", sentiment: 58.9, change: "+0.9%" },
  ],
  leaderMomentum: [
    { id: "modi", name: "Narendra Modi", party: "BJP", score: 72.8, movement: "+2.4%" },
    { id: "rahul", name: "Rahul Gandhi", party: "INC", score: 48.2, movement: "+1.8%" },
    { id: "mamata", name: "Mamata Banerjee", party: "AITC", score: 52.4, movement: "-0.5%" },
    { id: "kejriwal", name: "Arvind Kejriwal", party: "AAP", score: 61.8, movement: "+3.2%" },
  ],
};
