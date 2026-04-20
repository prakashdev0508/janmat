import type { RegionalInsightItem } from "../types";

type RegionalHeatSectionProps = {
  items: RegionalInsightItem[];
};

export function RegionalHeatSection({ items }: RegionalHeatSectionProps) {
  return (
    <section className="px-6 pb-8">
      <div className="glass-card mx-auto max-w-7xl rounded-[32px] p-6">
        <h2 className="mb-1 text-xl font-bold text-slate-900">Regional Sentiment Pulse</h2>
        <p className="mb-6 text-sm font-medium text-slate-500">
          State-wise sentiment levels and daily movement snapshots.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">{item.region}</h3>
                <span className="text-sm font-bold text-teal-600">{item.sentiment}%</span>
              </div>
              <div className="mb-2 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-500"
                  style={{ width: `${item.sentiment}%` }}
                />
              </div>
              <p
                className={`text-xs font-bold ${
                  item.change.startsWith("-") ? "text-orange-600" : "text-emerald-600"
                }`}
              >
                {item.change} today
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
