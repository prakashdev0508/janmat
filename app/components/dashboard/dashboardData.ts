import type {
  AccountSecurity,
  CivicPreferences,
  DataManagement,
  DashboardData,
  DashboardSettingToggle,
  DashboardUserProfile,
  FavoriteLeader,
  PersonalInformation,
  ProfileStatItem,
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

export const profileStats: ProfileStatItem[] = [
  {
    id: "total-votes",
    label: "Total Votes Cast",
    value: "1,248",
    icon: "vote",
    tone: "teal",
  },
  {
    id: "streak",
    label: "Voting Streak",
    value: "15 Days",
    icon: "streak",
    tone: "orange",
  },
  {
    id: "favorites",
    label: "Favorite Leaders",
    value: "12",
    icon: "favorites",
    tone: "emerald",
  },
  {
    id: "active-days",
    label: "Days Active",
    value: "342",
    icon: "activeDays",
    tone: "slate",
  },
];

export const personalInformation: PersonalInformation = {
  fullName: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  district: "Mumbai North, Maharashtra",
  bio: "Civic-minded voter who follows governance, infrastructure, and transparency updates.",
  emailVerified: true,
};

export const civicPreferences: CivicPreferences = {
  issueInterests: [
    "Infrastructure",
    "Education",
    "Healthcare",
    "Women Safety",
    "Jobs & Economy",
    "Digital Governance",
  ],
  digestFrequency: "weekly",
  toggles: [
    {
      id: "anonymous-votes",
      label: "Anonymous Votes",
      description: "Detach your identity from vote events in public-facing summaries.",
      enabled: true,
    },
    {
      id: "sentiment-alerts",
      label: "Sentiment Alerts",
      description: "Get notified when leader popularity shifts significantly in your region.",
      enabled: true,
    },
    {
      id: "data-sharing",
      label: "Data Sharing",
      description: "Share anonymized usage data to improve regional political insights.",
      enabled: false,
    },
  ],
};

export const accountSecurity: AccountSecurity = {
  twoFactorEnabled: true,
  lastLoginLabel: "Today, 10:24 AM",
  sessions: [
    {
      id: "session-current",
      device: "Windows PC",
      browser: "Chrome",
      location: "Mumbai",
      lastActive: "Current session",
      current: true,
    },
    {
      id: "session-mobile",
      device: "iPhone 13",
      browser: "Safari",
      location: "Mumbai",
      lastActive: "Last active 2h ago",
      current: false,
    },
  ],
};

export const dataManagement: DataManagement = {
  actions: [
    {
      id: "download-data",
      title: "Download My Data",
      description: "All profile and preference information.",
      icon: "download",
    },
    {
      id: "export-history",
      title: "Export Voting History",
      description: "Detailed log of your participation.",
      icon: "export",
    },
  ],
  deleteWarning: "This action is permanent and cannot be undone.",
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
  profileStats,
  personalInformation,
  civicPreferences,
  accountSecurity,
  dataManagement,
  recommendationLeaders,
  favoriteLeaders,
  recentVotes,
  streakDays,
  settingsToggles,
};
