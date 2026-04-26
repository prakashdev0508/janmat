export interface DashboardUserProfile {
  id: string;
  name: string;
  location: string;
  joinedLabel: string;
  streakDays: number;
  totalVotes: number;
  approvalRate: number;
  lastVoteLabel: string;
  avatarUrl: string;
}

export interface RecommendationLeader {
  id: string;
  name: string;
  role: string;
  party: string;
  tag: string;
  popularity: number;
  avatarUrl: string;
}

export interface FavoriteLeader {
  id: string;
  name: string;
  role: string;
  popularity: number;
  avatarUrl: string;
}

export interface RecentVoteItem {
  id: string;
  leaderName: string;
  voteType: "approve" | "reject";
  timestamp: string;
}

export interface StreakDay {
  day: number;
  active: boolean;
  isToday?: boolean;
}

export interface DashboardSettingToggle {
  id: string;
  label: string;
  enabled: boolean;
}

export interface DashboardData {
  userProfile: DashboardUserProfile;
  recommendationLeaders: RecommendationLeader[];
  favoriteLeaders: FavoriteLeader[];
  recentVotes: RecentVoteItem[];
  streakDays: StreakDay[];
  settingsToggles: DashboardSettingToggle[];
}
