import type {
  DashboardData,
  DashboardSettingToggle,
  DashboardUserProfile,
  FavoriteLeader,
  RecommendationLeader,
  RecentVoteItem,
  StreakDay,
} from "./types";

export const dashboardUserProfile: DashboardUserProfile = {
  id: "priya",
  name: "Priya Sharma",
  location: "Mumbai, Maharashtra",
  joinedLabel: "Joined Sept 2024",
  streakDays: 15,
  totalVotes: 142,
  approvalRate: 88,
  lastVoteLabel: "2h ago",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
};

export const recommendationLeaders: RecommendationLeader[] = [
  {
    id: "eknath",
    name: "Eknath Shinde",
    role: "Chief Minister",
    party: "SHS",
    tag: "Local Leader",
    popularity: 64.2,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eknath",
  },
  {
    id: "nitin",
    name: "Nitin Gadkari",
    role: "Minister of Road Transport",
    party: "BJP",
    tag: "High Impact",
    popularity: 71.4,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nitin",
  },
];

export const favoriteLeaders: FavoriteLeader[] = [
  {
    id: "modi",
    name: "Narendra Modi",
    role: "Prime Minister | BJP",
    popularity: 72.8,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
  },
  {
    id: "rahul",
    name: "Rahul Gandhi",
    role: "MP, Wayanad | INC",
    popularity: 48.2,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  },
  {
    id: "mamata",
    name: "Mamata Banerjee",
    role: "Chief Minister | AITC",
    popularity: 52.4,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
  },
];

export const recentVotes: RecentVoteItem[] = [
  {
    id: "vote-1",
    leaderName: "Narendra Modi",
    voteType: "approve",
    timestamp: "2h ago",
  },
  {
    id: "vote-2",
    leaderName: "Rahul Gandhi",
    voteType: "reject",
    timestamp: "1d ago",
  },
  {
    id: "vote-3",
    leaderName: "Mamata Banerjee",
    voteType: "approve",
    timestamp: "2d ago",
  },
];

export const streakDays: StreakDay[] = Array.from({ length: 18 }, (_, index) => {
  const day = index + 1;
  return {
    day,
    active: day <= 15,
    isToday: day === 15,
  };
});

export const settingsToggles: DashboardSettingToggle[] = [
  { id: "alerts", label: "Sentiment Alerts", enabled: true },
  { id: "reminder", label: "Daily Reminder", enabled: true },
  { id: "digest", label: "Weekly Digest", enabled: false },
];

export const fallbackDashboardData: DashboardData = {
  userProfile: dashboardUserProfile,
  recommendationLeaders,
  favoriteLeaders,
  recentVotes,
  streakDays,
  settingsToggles,
};
