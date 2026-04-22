export type TrendDirection = "up" | "down";

export interface RegionOption {
  id: string;
  label: string;
  count?: number;
}

export interface PartyOption {
  id: string;
  label: string;
  count?: number;
}

export interface SortOption {
  id: string;
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

export type RegionsSort = "popularity_desc" | "votes_desc" | "name_asc";
