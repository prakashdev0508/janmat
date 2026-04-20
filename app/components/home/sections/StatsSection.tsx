import type { StatItem } from "../homeData";
import { Activity, Map, UserCheck, Users2 } from "lucide-react";

const iconMap = {
  users: Users2,
  activity: Activity,
  map: Map,
  "user-check": UserCheck,
} as const;

export function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <section className="border-y border-slate-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              {(() => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap];
                return Icon ? <Icon className="mx-auto mb-4 h-9 w-9 text-teal-600" /> : null;
              })()}
              <h3 className="mb-2 text-4xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
