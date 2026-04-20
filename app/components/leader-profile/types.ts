export interface LeaderProfileMeta {
  id: string;
  name: string;
  role: string;
  party: string;
  location: string;
  website: string;
  twitter: string;
  activeSince: string;
  avatarUrl: string;
}

export interface ApprovalBreakdownItem {
  label: string;
  value: number;
  votesLabel: string;
  colorClass: string;
}

export interface RegionalSentimentItem {
  state: string;
  approval: number;
  deltaLabel: string;
}

export interface VotingStatItem {
  label: string;
  value: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  impactLabel: string;
  impactClass: string;
}

export interface RelatedLeaderCard {
  id: string;
  name: string;
  partyRegion: string;
  popularity: number;
  avatarUrl: string;
}

export interface LeaderProfileData {
  meta: LeaderProfileMeta;
  popularity: number;
  popularityDelta: string;
  approvalBreakdown: ApprovalBreakdownItem[];
  regionalSentiment: RegionalSentimentItem[];
  votingStats: VotingStatItem[];
  timeline: TimelineEvent[];
  relatedLeaders: RelatedLeaderCard[];
}
