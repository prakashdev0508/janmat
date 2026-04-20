import { Search } from "lucide-react";
import type { PartyOption, RegionOption, SortOption } from "../types";

type RegionalFiltersSidebarProps = {
  regions: RegionOption[];
  parties: PartyOption[];
  sortOptions: SortOption[];
};

export function RegionalFiltersSidebar({
  regions,
  parties,
  sortOptions,
}: RegionalFiltersSidebarProps) {
  return (
    <aside className="w-full flex-shrink-0 lg:w-80">
      <div className="space-y-8 lg:sticky lg:top-24">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or constituency..."
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
                key={region.label}
                className={
                  region.isActive
                    ? "rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-md"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-teal-500 hover:text-teal-600"
                }
              >
                {region.label}
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
              <label key={party.label} className="group flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={party.checked}
                  className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500/20"
                />
                <span className="text-sm font-bold text-slate-700 transition-colors group-hover:text-teal-600">
                  {party.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Sort By
          </h4>
          <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none">
            {sortOptions.map((option) => (
              <option key={option.label}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-sm font-bold text-slate-400">
            Showing <span className="text-slate-900">12</span> of{" "}
            <span className="text-slate-900">543</span> Leaders
          </p>
        </div>
      </div>
    </aside>
  );
}
