import { ChevronLeft, ChevronRight } from "lucide-react";

export function RegionalPagination() {
  return (
    <div className="mt-16 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:border-teal-400 hover:text-teal-600">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="h-10 w-10 rounded-xl bg-teal-600 text-sm font-bold text-white shadow-md">
          1
        </button>
        <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600">
          2
        </button>
        <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600">
          3
        </button>
        <span className="px-2 text-slate-400">...</span>
        <button className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600">
          5
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:border-teal-400 hover:text-teal-600">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm font-bold text-slate-400">Page 1 of 5</p>
    </div>
  );
}
