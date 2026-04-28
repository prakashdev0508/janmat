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

export interface ProfileStatItem {
  id: string;
  label: string;
  value: string;
  icon: "vote" | "streak" | "favorites" | "activeDays";
  tone: "teal" | "orange" | "emerald" | "slate";
}

export interface PersonalInformation {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  bio: string;
  emailVerified: boolean;
}

export interface PreferenceToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface CivicPreferences {
  issueInterests: string[];
  digestFrequency: "weekly" | "monthly" | "quarterly" | "never";
  toggles: PreferenceToggle[];
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface AccountSecurity {
  twoFactorEnabled: boolean;
  lastLoginLabel: string;
  sessions: ActiveSession[];
}

export interface DataActionItem {
  id: string;
  title: string;
  description: string;
  icon: "download" | "export";
}

export interface DataManagement {
  actions: DataActionItem[];
  deleteWarning: string;
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
  profileStats: ProfileStatItem[];
  personalInformation: PersonalInformation;
  civicPreferences: CivicPreferences;
  accountSecurity: AccountSecurity;
  dataManagement: DataManagement;
  recommendationLeaders: RecommendationLeader[];
  favoriteLeaders: FavoriteLeader[];
  recentVotes: RecentVoteItem[];
  streakDays: StreakDay[];
  settingsToggles: DashboardSettingToggle[];
}
