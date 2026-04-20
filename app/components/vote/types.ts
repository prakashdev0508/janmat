export interface FeaturedVoteLeader {
  id: string;
  name: string;
  role: string;
  party: string;
  popularity: number;
  avatarUrl: string;
}

export interface TrendingVoteLeader {
  id: string;
  name: string;
  role: string;
  party: string;
  popularity: number;
  avatarUrl: string;
}

export interface VoteWindowStatus {
  title: string;
  description: string;
  availabilityLabel: string;
}

export interface VotePageData {
  featuredLeader: FeaturedVoteLeader;
  voteWindow: VoteWindowStatus;
  trendingLeaders: TrendingVoteLeader[];
}
