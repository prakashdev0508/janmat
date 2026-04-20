import type { LeaderProfileData } from "./types";

const baseRelatedLeaders = [
  {
    id: "rahul",
    name: "Rahul Gandhi",
    partyRegion: "INC | Wayanad",
    popularity: 48.2,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  },
  {
    id: "mamata",
    name: "Mamata Banerjee",
    partyRegion: "AITC | West Bengal",
    popularity: 52.4,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
  },
  {
    id: "yogi",
    name: "Yogi Adityanath",
    partyRegion: "BJP | Uttar Pradesh",
    popularity: 71.4,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yogi",
  },
  {
    id: "kejriwal",
    name: "Arvind Kejriwal",
    partyRegion: "AAP | Delhi",
    popularity: 61.8,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind",
  },
] as const;

export const leaderProfilesById: Record<string, LeaderProfileData> = {
  modi: {
    meta: {
      id: "modi",
      name: "Narendra Modi",
      role: "Prime Minister of India",
      party: "BJP",
      location: "New Delhi, India",
      website: "narendramodi.in",
      twitter: "@narendramodi",
      activeSince: "2001",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
    },
    popularity: 72.8,
    popularityDelta: "+2.4%",
    approvalBreakdown: [
      {
        label: "Approval",
        value: 72.8,
        votesLabel: "17.8M votes",
        colorClass: "bg-teal-500",
      },
      {
        label: "Disapproval",
        value: 18.4,
        votesLabel: "4.5M votes",
        colorClass: "bg-orange-500",
      },
      {
        label: "Neutral",
        value: 8.8,
        votesLabel: "2.1M votes",
        colorClass: "bg-slate-400",
      },
    ],
    regionalSentiment: [
      { state: "Uttar Pradesh", approval: 78.4, deltaLabel: "+1.2%" },
      { state: "Gujarat", approval: 81.1, deltaLabel: "+0.9%" },
      { state: "Maharashtra", approval: 66.3, deltaLabel: "-0.3%" },
      { state: "West Bengal", approval: 41.6, deltaLabel: "+0.2%" },
    ],
    votingStats: [
      { label: "Total Votes Today", value: "1,240,512" },
      { label: "Approval Votes", value: "902,293" },
      { label: "Disapproval Votes", value: "228,254" },
    ],
    timeline: [
      {
        date: "Oct 14, 2024",
        title: "Infrastructure Push",
        description:
          "New national highway project announcement improved urban sentiment.",
        impactLabel: "+1.2% Rise",
        impactClass: "text-emerald-600",
      },
      {
        date: "Oct 08, 2024",
        title: "Energy Subsidy Update",
        description:
          "Mixed reaction in rural states after revised subsidy allocation.",
        impactLabel: "0.0% No Change",
        impactClass: "text-slate-500",
      },
      {
        date: "Oct 02, 2024",
        title: "Import Tax Regulation",
        description:
          "Disapproval increased among trading communities after customs rules.",
        impactLabel: "-0.8% Drop",
        impactClass: "text-red-500",
      },
    ],
    relatedLeaders: [...baseRelatedLeaders],
  },
};

export const defaultLeaderProfileId = "modi";

export function getLeaderProfileData(leaderId: string): LeaderProfileData | null {
  return leaderProfilesById[leaderId] ?? null;
}
