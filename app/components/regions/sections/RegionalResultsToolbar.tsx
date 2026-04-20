import { LayoutGrid, List } from "lucide-react";

export function RegionalResultsToolbar() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Top Representatives</h2>
        <div className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-600">
          Real-time data
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400">VIEW:</span>
        <button className="rounded-lg bg-teal-50 p-2 text-teal-600">
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100">
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
