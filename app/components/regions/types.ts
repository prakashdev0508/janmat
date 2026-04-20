export type TrendDirection = "up" | "down";

export interface RegionOption {
  label: string;
  isActive?: boolean;
}

export interface PartyOption {
  label: string;
  checked?: boolean;
}

export interface SortOption {
  label: string;
}

export interface LeaderResult {
  id: string;
  name: string;
  role: string;
  party: string;
  region: string;
  avatarUrl: string;
  sentiment: number;
  trendDirection: TrendDirection;
  trendValue: string;
  votesToday: string;
}
