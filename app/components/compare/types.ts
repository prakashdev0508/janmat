export type ComparisonStatusLevel = "low" | "medium" | "high";

export interface TrendPoint {
  x: number;
  y: number;
}

export interface ComparedLeader {
  id: string;
  name: string;
  role: string;
  party: string;
  profileType: string;
  avatarUrl: string;
  sentiment: number;
  sentimentDelta: string;
  dailyVolume: string;
  stronghold: string;
  trendLabel: string;
  trendPoints: TrendPoint[];
  isLeader?: boolean;
}

export interface ComparisonMetricRowValue {
  value: string;
  status?: ComparisonStatusLevel;
}

export interface ComparisonMetricRow {
  parameter: string;
  values: ComparisonMetricRowValue[];
}

export interface ComparisonPageData {
  leaders: ComparedLeader[];
  metricRows: ComparisonMetricRow[];
}
