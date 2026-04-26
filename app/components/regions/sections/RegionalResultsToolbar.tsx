import { LayoutGrid, List } from "lucide-react";
import type { RegionsViewMode } from "../types";

type RegionalResultsToolbarProps = {
  totalLeaders: number;
  viewMode: RegionsViewMode;
  onViewModeChange: (viewMode: RegionsViewMode) => void;
};

export function RegionalResultsToolbar({
  totalLeaders,
  viewMode,
  onViewModeChange,
}: RegionalResultsToolbarProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Top Representatives</h2>
        <div className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-600">
          Real-time data ({totalLeaders})
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400">VIEW:</span>
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={`rounded-lg p-2 ${viewMode === "grid" ? "bg-teal-50 text-teal-600" : "text-slate-400 transition-all hover:bg-slate-100"}`}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          className={`rounded-lg p-2 ${viewMode === "list" ? "bg-teal-50 text-teal-600" : "text-slate-400 transition-all hover:bg-slate-100"}`}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
