import type { VotingStatItem } from "../types";

type VotingStatsStripProps = {
  stats: VotingStatItem[];
};

export function VotingStatsStrip({ stats }: VotingStatsStripProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className="glass-card rounded-[24px] p-6 text-center">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            {item.label}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
