import type { ComparedLeader } from "../types";
import { LeaderComparisonColumn } from "./LeaderComparisonColumn";

type LeaderComparisonGridProps = {
  leaders: ComparedLeader[];
};

export function LeaderComparisonGrid({ leaders }: LeaderComparisonGridProps) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute top-1/2 -left-32 hidden -translate-y-1/2 space-y-24 pr-6 text-right md:block">
            <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
              Popularity
            </span>
            <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
              Daily Volume
            </span>
            <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
              Stronghold
            </span>
            <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
              Trend
            </span>
          </div>

          {leaders.map((leader) => (
            <LeaderComparisonColumn key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
