import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import type { InsightsKpiItem } from "../types";

type InsightsKpiGridProps = {
  items: InsightsKpiItem[];
};

export function InsightsKpiGrid({ items }: InsightsKpiGridProps) {
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const TrendIcon = item.positive ? TrendingUp : TrendingDown;
          return (
            <article key={item.id} className="glass-card rounded-3xl p-6">
              <Activity className="mb-4 h-8 w-8 text-teal-600" />
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">{item.value}</p>
              <div
                className={`mt-3 inline-flex items-center gap-1 text-xs font-bold ${
                  item.positive ? "text-emerald-600" : "text-orange-600"
                }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {item.deltaLabel}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
