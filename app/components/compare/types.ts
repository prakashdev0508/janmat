export interface ComparisonBreadcrumb {
  label: string;
  href?: string;
}

export interface LeaderSelectorField {
  label: string;
  placeholder: string;
}

export interface ComparedLeader {
  id: string;
  name: string;
  role: string;
  party: string;
  avatarUrl: string;
  sentiment: number;
  sentimentDelta: string;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary";
  partyColor: "orange" | "blue";
}

export interface TrendSeries {
  label: string;
  momentumLabel: string;
  bars: number[];
}

export interface RegionalPerformanceRow {
  region: string;
  leaderOneVotes: string;
  leaderOneShare: number;
  leaderTwoVotes: string;
  leaderTwoShare: number;
}

export interface SentimentBreakdown {
  leaderId: string;
  approval: number;
  note: string;
}

export interface KeyMetricRow {
  label: string;
  leaderOneValue: string;
  badge: string;
  leaderTwoValue: string;
}

export interface OtherComparisonCard {
  title: string;
  leaderOneAvatar: string;
  leaderTwoAvatar: string;
}

export interface ComparisonPageData {
  breadcrumbs: ComparisonBreadcrumb[];
  selectorFields: LeaderSelectorField[];
  popularComparisons: string[];
  leaders: ComparedLeader[];
  trendSeries: TrendSeries[];
  regionalPerformance: RegionalPerformanceRow[];
  sentimentBreakdowns: SentimentBreakdown[];
  keyMetrics: KeyMetricRow[];
  otherComparisons: OtherComparisonCard[];
}
