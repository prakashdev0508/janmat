import type { TimelineEvent } from "../types";

type RecentActivityTimelineProps = {
  items: TimelineEvent[];
};

export function RecentActivityTimeline({ items }: RecentActivityTimelineProps) {
  return (
    <section className="glass-card rounded-[32px] p-8">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">Recent Activity Timeline</h3>
      <div className="space-y-6 border-l-2 border-slate-100 pl-6">
        {items.map((item) => (
          <div key={`${item.date}-${item.title}`} className="relative">
            <div className="absolute -left-[31px] h-3 w-3 rounded-full bg-teal-500" />
            <span className="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              {item.date}
            </span>
            <h4 className="mb-1 text-sm font-bold text-slate-900">{item.title}</h4>
            <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
            <span className={`text-[10px] font-bold ${item.impactClass}`}>{item.impactLabel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
