export interface InsightsKpiItem {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  positive: boolean;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface RegionalInsightItem {
  id: string;
  region: string;
  sentiment: number;
  change: string;
}

export interface LeaderMomentumItem {
  id: string;
  name: string;
  party: string;
  score: number;
  movement: string;
}

export interface InsightsAnalyticsData {
  kpis: InsightsKpiItem[];
  trendSeries: TrendPoint[];
  regionalInsights: RegionalInsightItem[];
  leaderMomentum: LeaderMomentumItem[];
}
