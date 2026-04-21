import type { ComparisonPageData } from "./types";

export const comparisonPageData: ComparisonPageData = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Explore Leaders", href: "/regions" },
    { label: "Compare" },
  ],
  selectorFields: [
    { label: "Leader One", placeholder: "Narendra Modi" },
    { label: "Leader Two", placeholder: "Rahul Gandhi" },
  ],
  popularComparisons: ["Modi vs Kejriwal", "Mamata vs Rahul", "Yogi vs Stalin"],
  leaders: [
    {
      id: "modi",
      name: "Narendra Modi",
      role: "Prime Minister of India",
      party: "BJP",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
      sentiment: 72.8,
      sentimentDelta: "+2.4%",
      buttonLabel: "Vote for Modi",
      buttonVariant: "primary",
      partyColor: "orange",
    },
    {
      id: "rahul",
      name: "Rahul Gandhi",
      role: "MP, Wayanad",
      party: "INC",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      sentiment: 48.2,
      sentimentDelta: "+1.8%",
      buttonLabel: "Vote for Rahul",
      buttonVariant: "secondary",
      partyColor: "blue",
    },
  ],
  trendSeries: [
    {
      label: "Modi Score Progression",
      momentumLabel: "+4.0% MoM",
      bars: [65, 62, 68, 70, 66, 72, 75, 73],
    },
    {
      label: "Rahul Score Progression",
      momentumLabel: "+2.2% MoM",
      bars: [42, 45, 41, 40, 44, 46, 47, 48],
    },
  ],
  regionalPerformance: [
    {
      region: "Uttar Pradesh",
      leaderOneVotes: "128,420",
      leaderOneShare: 71,
      leaderTwoVotes: "52,380",
      leaderTwoShare: 29,
    },
    {
      region: "Bihar",
      leaderOneVotes: "64,112",
      leaderOneShare: 52,
      leaderTwoVotes: "59,007",
      leaderTwoShare: 48,
    },
    {
      region: "Karnataka",
      leaderOneVotes: "22,150",
      leaderOneShare: 65,
      leaderTwoVotes: "18,440",
      leaderTwoShare: 35,
    },
  ],
  sentimentBreakdowns: [
    {
      leaderId: "modi",
      approval: 73,
      note: "High confidence in Northern regions.",
    },
    {
      leaderId: "rahul",
      approval: 48,
      note: "Gaining momentum in Southern India.",
    },
  ],
  keyMetrics: [
    {
      label: "Total Votes Today",
      leaderOneValue: "1.2M",
      badge: "+43% Gap",
      leaderTwoValue: "840K",
    },
    {
      label: "Approval Rate",
      leaderOneValue: "72.8%",
      badge: "Modi Winner",
      leaderTwoValue: "48.2%",
    },
    {
      label: "24h Momentum",
      leaderOneValue: "+2.4%",
      badge: "Modi Leading",
      leaderTwoValue: "+1.8%",
    },
    {
      label: "Regional Strength",
      leaderOneValue: "45 States",
      badge: "Modi Stronger",
      leaderTwoValue: "18 States",
    },
  ],
  otherComparisons: [
    {
      title: "Modi vs Kejriwal",
      leaderOneAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
      leaderTwoAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind",
    },
    {
      title: "Mamata vs Rahul",
      leaderOneAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
      leaderTwoAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      title: "Yogi vs Stalin",
      leaderOneAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yogi",
      leaderTwoAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Stalin",
    },
    {
      title: "Nitish vs Jagan",
      leaderOneAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nitish",
      leaderTwoAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jagan",
    },
  ],
};
