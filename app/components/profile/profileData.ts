import type { UserProfileData } from "./types";

export const fallbackUserProfileData: UserProfileData = {
  header: {
    fullName: "Priya Sharma",
    cityState: "Mumbai, Maharashtra",
    memberSince: "Member since April 2023",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    verifiedLabel: "Verified Citizen",
  },
  stats: [
    {
      id: "votes",
      label: "Total Votes Cast",
      value: "1,248",
      tone: "teal",
    },
    {
      id: "streak",
      label: "Voting Streak",
      value: "15 Days",
      tone: "orange",
    },
    {
      id: "favorites",
      label: "Favorite Leaders",
      value: "12",
      tone: "emerald",
    },
    {
      id: "days-active",
      label: "Days Active",
      value: "342",
      tone: "slate",
    },
  ],
  personalInfo: {
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    district: "Mumbai North, Maharashtra",
    bio: "Civic-minded voter following governance, infrastructure, and public transparency updates.",
    emailVerified: true,
  },
  civicPreferences: {
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
        description:
          "All your votes are detached from your identity in aggregate analysis.",
        enabled: true,
      },
      {
        id: "sentiment-alerts",
        label: "Sentiment Alerts",
        description: "Get notified when your tracked leaders show major momentum shifts.",
        enabled: true,
      },
      {
        id: "data-sharing",
        label: "Data Sharing",
        description: "Share anonymized behavior data to improve public sentiment insights.",
        enabled: false,
      },
    ],
  },
  security: {
    twoFactorEnabled: true,
    lastLogin: "Today, 10:24 AM",
    sessions: [
      {
        id: "session-desktop",
        device: "Windows PC",
        browser: "Chrome",
        location: "Mumbai",
        lastActive: "Current Session",
        isCurrent: true,
      },
      {
        id: "session-mobile",
        device: "iPhone 13",
        browser: "Safari",
        location: "Mumbai",
        lastActive: "Last active: 2h ago",
        isCurrent: false,
      },
    ],
  },
  dataManagement: {
    actions: [
      {
        id: "download",
        title: "Download My Data",
        description: "All profile and preference information.",
      },
      {
        id: "export-history",
        title: "Export Voting History",
        description: "Detailed log of your participation.",
      },
    ],
    deleteWarning: "This action is permanent and cannot be undone.",
  },
};
