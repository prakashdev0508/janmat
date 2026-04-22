import { Search } from "lucide-react";
import type { PartyOption, RegionOption, RegionsSort, SortOption } from "../types";

type RegionalFiltersSidebarProps = {
  regions: RegionOption[];
  parties: PartyOption[];
  sortOptions: SortOption[];
  searchQuery: string;
  selectedRegionId: string;
  selectedPartyIds: string[];
  selectedSort: RegionsSort;
  totalVisibleLeaders: number;
  totalLeaders: number;
  onSearchQueryChange: (value: string) => void;
  onRegionChange: (regionId: string) => void;
  onPartyToggle: (partyId: string) => void;
  onSortChange: (sort: RegionsSort) => void;
};

function getPartyAbbreviation(label: string): string {
  const words = label
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return label;
  }

  if (words.length === 1) {
    return words[0].slice(0, 4).toUpperCase();
  }

  return words.map((word) => word[0]?.toUpperCase() ?? "").join("");
}

export function RegionalFiltersSidebar({
  regions,
  parties,
  sortOptions,
  searchQuery,
  selectedRegionId,
  selectedPartyIds,
  selectedSort,
  totalVisibleLeaders,
  totalLeaders,
  onSearchQueryChange,
  onRegionChange,
  onPartyToggle,
  onSortChange,
}: RegionalFiltersSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:w-80">
      <div className="space-y-8 lg:sticky lg:top-24">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or constituency..."
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 font-medium text-slate-700 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
          />
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
            State / Region
          </h4>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => onRegionChange(region.id)}
                className={
                  selectedRegionId === region.id
                    ? "rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-md"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-teal-500 hover:text-teal-600"
                }
              >
                {region.label}{" "}
                {typeof region.count === "number" ? (
                  <span className="text-[11px] opacity-80">({region.count})</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Political Party
          </h4>
          <div className="grid grid-cols-2 gap-y-3">
            {parties.map((party) => (
              <label key={party.id} className="group flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPartyIds.includes(party.id)}
                  onChange={() => onPartyToggle(party.id)}
                  className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20"
                />
                <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-teal-600">
                  {getPartyAbbreviation(party.label)}
                  {typeof party.count === "number" ? (
                    <span className="ml-1 text-xs text-slate-400">({party.count})</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Sort By
          </h4>
          <select
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value as RegionsSort)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">{totalVisibleLeaders}</span> of{" "}
            <span className="text-slate-900">{totalLeaders}</span> Leaders
          </p>
        </div>
      </div>
    </aside>
  );
}
