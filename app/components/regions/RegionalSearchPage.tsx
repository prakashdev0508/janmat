"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { RegionalFiltersSidebar } from "./sections/RegionalFiltersSidebar";
import { RegionalLeadersGrid } from "./sections/RegionalLeadersGrid";
import { RegionalPagination } from "./sections/RegionalPagination";
import { RegionalResultsToolbar } from "./sections/RegionalResultsToolbar";
import { RegionalSearchHeader } from "./sections/RegionalSearchHeader";
import type { LeaderResult, PartyOption, RegionOption, RegionsSort, RegionsViewMode, SortOption } from "./types";

type RegionsFacetsResponse = {
  regions: RegionOption[];
  parties: PartyOption[];
  sortOptions: SortOption[];
};

type RegionsLeadersResponse = {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    sort: RegionsSort;
  };
  items: LeaderResult[];
  error?: string;
};

const DEFAULT_SORT: RegionsSort = "popularity_desc";

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);
    return () => window.clearTimeout(timeout);
  }, [delayMs, value]);

  return debouncedValue;
}

export function RegionalSearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [regions, setRegions] = useState<RegionOption[]>([]);
  const [parties, setParties] = useState<PartyOption[]>([]);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([
    { id: "popularity_desc", label: "Popularity (High to Low)" },
    { id: "votes_desc", label: "Total Vote Count" },
    { id: "name_asc", label: "Name (A-Z)" },
  ]);

  const [leaders, setLeaders] = useState<LeaderResult[]>([]);
  const [viewMode, setViewMode] = useState<RegionsViewMode>("grid");
  const [isLeadersLoading, setIsLeadersLoading] = useState(true);
  const [isFacetsLoading, setIsFacetsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 1,
    sort: DEFAULT_SORT as RegionsSort,
  });

  const [searchQueryInput, setSearchQueryInput] = useState(searchParams.get("q") ?? "");
  const [leadersRefreshToken, setLeadersRefreshToken] = useState(0);

  const selectedRegionId = searchParams.get("state") ?? "all";
  const selectedPartyIds = useMemo(
    () =>
      (searchParams.get("party") ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [searchParams],
  );
  const selectedSort = (searchParams.get("sort") as RegionsSort | null) ?? DEFAULT_SORT;
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
  const pageSize = Number.parseInt(searchParams.get("pageSize") ?? "12", 10) || 12;
  const debouncedQuery = useDebouncedValue(searchQueryInput, 300);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      router.replace(`${pathname}?${next.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    fetch("/api/regions/facets")
      .then(async (response) => {
        const data = (await response.json()) as RegionsFacetsResponse & { error?: string };
        if (!response.ok) {
          throw new Error(data.error || "Failed to load filters.");
        }
        setRegions(data.regions);
        setParties(data.parties);
        setSortOptions(data.sortOptions);
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Failed to load data.");
      })
      .finally(() => {
        setIsFacetsLoading(false);
      });
  }, []);

  useEffect(() => {
    let isCurrentRequest = true;

    const run = async () => {
      setError(null);
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      if (selectedRegionId && selectedRegionId !== "all") params.set("state", selectedRegionId);
      if (selectedPartyIds.length > 0) params.set("party", selectedPartyIds.join(","));
      if (selectedSort) params.set("sort", selectedSort);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      try {
        const response = await fetch(`/api/regions/leaders?${params.toString()}`);
        const data = (await response.json()) as RegionsLeadersResponse & { error?: string };
        if (!response.ok) {
          throw new Error(data.error || "Failed to load leaders.");
        }
        if (!isCurrentRequest) return;
        setLeaders(data.items);
        setMeta(data.meta);
      } catch (requestError) {
        if (!isCurrentRequest) return;
        setError(requestError instanceof Error ? requestError.message : "Failed to load leaders.");
      } finally {
        if (!isCurrentRequest) return;
        setIsLeadersLoading(false);
      }
    };

    run();
    return () => {
      isCurrentRequest = false;
    };
  }, [
    debouncedQuery,
    leadersRefreshToken,
    page,
    pageSize,
    selectedPartyIds,
    selectedRegionId,
    selectedSort,
  ]);

  useEffect(() => {
    const qFromUrl = searchParams.get("q") ?? "";
    if (debouncedQuery !== qFromUrl) {
      updateQueryParams({
        q: debouncedQuery || null,
        page: "1",
      });
    }
  }, [debouncedQuery, searchParams, updateQueryParams]);

  const totalVisibleLeaders = isLeadersLoading ? 0 : leaders.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="regions" />
      <RegionalSearchHeader />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
          <RegionalFiltersSidebar
            regions={regions}
            parties={parties}
            sortOptions={sortOptions}
            searchQuery={searchQueryInput}
            selectedRegionId={selectedRegionId}
            selectedPartyIds={selectedPartyIds}
            selectedSort={selectedSort}
            totalVisibleLeaders={totalVisibleLeaders}
            totalLeaders={meta.total}
            onSearchQueryChange={setSearchQueryInput}
            onRegionChange={(regionId) =>
              {
                setIsLeadersLoading(true);
                updateQueryParams({
                  state: regionId === "all" ? null : regionId,
                  page: "1",
                });
              }
            }
            onPartyToggle={(partyId) => {
              setIsLeadersLoading(true);
              const next = selectedPartyIds.includes(partyId)
                ? selectedPartyIds.filter((id) => id !== partyId)
                : [...selectedPartyIds, partyId];
              updateQueryParams({
                party: next.length > 0 ? next.join(",") : null,
                page: "1",
              });
            }}
            onSortChange={(sort) =>
              {
                setIsLeadersLoading(true);
                updateQueryParams({
                  sort,
                  page: "1",
                });
              }
            }
          />

          <div className="flex-1">
            <RegionalResultsToolbar
              totalLeaders={meta.total}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <RegionalLeadersGrid
              leaders={leaders}
              viewMode={viewMode}
              isLoading={isLeadersLoading || isFacetsLoading}
              error={error}
              onRetry={() => {
                setIsLeadersLoading(true);
                setLeadersRefreshToken((prev) => prev + 1);
              }}
            />
            <RegionalPagination
              page={meta.page}
              totalPages={meta.totalPages}
              isLoading={isLeadersLoading}
              onPageChange={(nextPage) =>
                {
                  setIsLeadersLoading(true);
                  updateQueryParams({
                    page: String(nextPage),
                  });
                }
              }
            />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
