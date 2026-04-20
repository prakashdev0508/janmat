import type { ComparisonPageData } from "./types";

export const comparisonPageData: ComparisonPageData = {
  leaders: [
    {
      id: "modi",
      name: "Narendra Modi",
      role: "Prime Minister",
      party: "BJP",
      profileType: "National Leader",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
      sentiment: 72.8,
      sentimentDelta: "+2.4%",
      dailyVolume: "1,240,512",
      stronghold: "Gujarat",
      trendLabel: "Stable Growth",
      trendPoints: [
        { x: 0, y: 62 },
        { x: 25, y: 56 },
        { x: 50, y: 60 },
        { x: 75, y: 49 },
        { x: 100, y: 44 },
      ],
      isLeader: true,
    },
    {
      id: "rahul",
      name: "Rahul Gandhi",
      role: "MP, Wayanad",
      party: "INC",
      profileType: "Opposition Leader",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      sentiment: 48.2,
      sentimentDelta: "+1.8%",
      dailyVolume: "840,122",
      stronghold: "Kerala",
      trendLabel: "Recovering",
      trendPoints: [
        { x: 0, y: 72 },
        { x: 25, y: 54 },
        { x: 50, y: 61 },
        { x: 75, y: 46 },
        { x: 100, y: 52 },
      ],
    },
    {
      id: "mamata",
      name: "Mamata Banerjee",
      role: "Chief Minister",
      party: "AITC",
      profileType: "Regional Leader",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
      sentiment: 52.4,
      sentimentDelta: "-0.5%",
      dailyVolume: "420,019",
      stronghold: "West Bengal",
      trendLabel: "Volatile",
      trendPoints: [
        { x: 0, y: 48 },
        { x: 25, y: 66 },
        { x: 50, y: 56 },
        { x: 75, y: 71 },
        { x: 100, y: 50 },
      ],
    },
  ],
  metricRows: [
    {
      parameter: "Net Approval Range (30D)",
      values: [{ value: "68% - 74%" }, { value: "42% - 49%" }, { value: "48% - 53%" }],
    },
    {
      parameter: "Sentiment Volatility",
      values: [
        { value: "LOW", status: "low" },
        { value: "MEDIUM", status: "medium" },
        { value: "HIGH", status: "high" },
      ],
    },
    {
      parameter: "Key Demographic Gap",
      values: [
        { value: "Gen-Z (42% Approval)" },
        { value: "Rural (38% Approval)" },
        { value: "Urban (32% Approval)" },
      ],
    },
    {
      parameter: "Peak Voter Window",
      values: [
        { value: "7:00 PM - 10:00 PM" },
        { value: "8:00 AM - 11:00 AM" },
        { value: "4:00 PM - 7:00 PM" },
      ],
    },
  ],
};
