import type { KeyMetricRow } from "../types";

type ComparisonMetricsTableProps = {
  metricRows: KeyMetricRow[];
};

export function ComparisonMetricsTable({ metricRows }: ComparisonMetricsTableProps) {
  return (
    <div className="space-y-4">
      {metricRows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-12"
        >
          <div className="text-sm font-bold tracking-widest text-slate-500 uppercase md:col-span-4">
            {row.label}
          </div>
          <div className="text-lg font-black text-teal-600 md:col-span-3 md:text-center">
            {row.leaderOneValue}
          </div>
          <div className="md:col-span-2 md:text-center">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 uppercase">
              {row.badge}
            </span>
          </div>
          <div className="text-lg font-bold text-slate-400 md:col-span-3 md:text-center">
            {row.leaderTwoValue}
          </div>
        </div>
      ))}
    </div>
  );
}
