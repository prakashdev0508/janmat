import Link from "next/link";
import type { RegionalSentimentItem } from "../types";

type RegionalPerformanceSectionProps = {
  items: RegionalSentimentItem[];
};

export function RegionalPerformanceSection({ items }: RegionalPerformanceSectionProps) {
  return (
    <section className="glass-card rounded-[32px] p-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Regional Performance</h3>
          <p className="font-medium text-slate-500">
            Sentiment breakdown across major states.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.state} className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="mb-2 flex justify-between">
              <h4 className="font-bold text-slate-900">{item.state}</h4>
              <span className="text-sm font-bold text-teal-600">{item.approval}%</span>
            </div>
            <div className="mb-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${item.approval}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-slate-500">{item.deltaLabel} today</p>
          </div>
        ))}
      </div>

      <Link
        href="/regions"
        className="mt-4 block text-center text-sm font-bold text-teal-600 transition-colors hover:text-teal-700"
      >
        View All 36 States &amp; UTs
      </Link>
    </section>
  );
}
