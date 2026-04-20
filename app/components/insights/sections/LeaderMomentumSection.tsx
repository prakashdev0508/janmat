import Link from "next/link";
import type { LeaderMomentumItem } from "../types";

type LeaderMomentumSectionProps = {
  items: LeaderMomentumItem[];
};

export function LeaderMomentumSection({ items }: LeaderMomentumSectionProps) {
  return (
    <section className="px-6 pb-16">
      <div className="glass-card mx-auto max-w-7xl rounded-[32px] p-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="mb-1 text-xl font-bold text-slate-900">Leader Momentum</h2>
            <p className="text-sm font-medium text-slate-500">
              Daily movement among the most tracked political leaders.
            </p>
          </div>
          <Link href="/compare" className="text-sm font-bold text-teal-600 hover:underline">
            Compare All
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-900">{item.name}</h3>
                <p className="text-xs font-medium text-slate-500">{item.party}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-sm font-bold text-slate-900">{item.score}%</p>
                <p
                  className={`text-sm font-bold ${
                    item.movement.startsWith("-") ? "text-orange-600" : "text-emerald-600"
                  }`}
                >
                  {item.movement}
                </p>
                <Link
                  href={`/leaders/${item.id}`}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Full Profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
