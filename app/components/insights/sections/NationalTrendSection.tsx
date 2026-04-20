import type { TrendPoint } from "../types";

type NationalTrendSectionProps = {
  points: TrendPoint[];
};

export function NationalTrendSection({ points }: NationalTrendSectionProps) {
  return (
    <section className="px-6 pb-8">
      <div className="glass-card mx-auto max-w-7xl rounded-[32px] p-6">
        <h2 className="mb-1 text-xl font-bold text-slate-900">National Sentiment Trend</h2>
        <p className="mb-6 text-sm font-medium text-slate-500">
          12-day sentiment movement based on aggregated vote behavior.
        </p>

        <div className="flex h-48 items-end gap-2">
          {points.map((point) => (
            <div key={point.label + point.value} className="flex w-full flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-teal-500/80"
                style={{ height: `${point.value}%` }}
              />
              <span className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
