import { Search } from "lucide-react";
import type { LeaderSelectorField, PopularComparisonItem } from "../types";

type ComparisonSelectorSectionProps = {
  allLeaders: Array<{ id: string; name: string }>;
  fields: LeaderSelectorField[];
  popularComparisons: PopularComparisonItem[];
  onPairChange: (leaderOneId: string, leaderTwoId: string) => void;
};

export function ComparisonSelectorSection({
  allLeaders,
  fields,
  popularComparisons,
  onPairChange,
}: ComparisonSelectorSectionProps) {
  const leaderOneId = fields.find((field) => field.id === "leaderOne")?.value ?? "";
  const leaderTwoId = fields.find((field) => field.id === "leaderTwo")?.value ?? "";

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="mb-3 ml-1 block text-xs font-bold tracking-widest text-slate-400 uppercase">
                {field.label}
              </label>
              <div className="group relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal-600" />
                <select
                  value={field.value}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    if (field.id === "leaderOne") {
                      onPairChange(nextValue, leaderTwoId);
                    } else {
                      onPairChange(leaderOneId, nextValue);
                    }
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 font-bold text-slate-900 shadow-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-none"
                >
                  {allLeaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-sm font-bold text-slate-400">Popular Comparisons:</span>
          {popularComparisons.map((comparison) => (
            <button
              key={comparison.label}
              type="button"
              onClick={() => onPairChange(comparison.leaderOneId, comparison.leaderTwoId)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-teal-500 hover:text-teal-600"
            >
              {comparison.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
