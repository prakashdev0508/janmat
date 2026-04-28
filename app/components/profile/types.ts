export type ProfileStatTone = "teal" | "orange" | "emerald" | "slate";

export interface UserProfileHeaderData {
  fullName: string;
  cityState: string;
  memberSince: string;
  avatarUrl: string;
  verifiedLabel: string;
}

export interface UserProfileStat {
  id: string;
  label: string;
  value: string;
  tone: ProfileStatTone;
}

export interface UserPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  bio: string;
  emailVerified: boolean;
}

export type DigestFrequency = "weekly" | "monthly" | "quarterly" | "never";

export interface UserPreferenceToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface UserCivicPreferences {
  issueInterests: string[];
  digestFrequency: DigestFrequency;
  toggles: UserPreferenceToggle[];
}

export interface UserSecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface UserSecurityData {
  twoFactorEnabled: boolean;
  lastLogin: string;
  sessions: UserSecuritySession[];
}

export interface UserDataAction {
  id: string;
  title: string;
  description: string;
}

export interface UserDataManagement {
  actions: UserDataAction[];
  deleteWarning: string;
}

export interface UserProfileData {
  header: UserProfileHeaderData;
  stats: UserProfileStat[];
  personalInfo: UserPersonalInfo;
  civicPreferences: UserCivicPreferences;
  security: UserSecurityData;
  dataManagement: UserDataManagement;
}
