import Image from "next/image";
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import type { Leader } from "../homeData";

function LeaderCard({ leader }: { leader: Leader }) {
  const trendColor = leader.trend === "up" ? "text-teal-600" : "text-red-500";
  const TrendIcon = leader.trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="glass-card rounded-3xl p-6 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={leader.avatarUrl}
            alt={leader.name}
            className="h-16 w-16 rounded-2xl bg-slate-100 object-cover"
            width={64}
            height={64}
            unoptimized
          />
          <div>
            <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
            <p className="text-sm font-medium text-slate-500">{leader.role}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-sm font-bold ${trendColor}`}>
          <TrendIcon className="h-4 w-4" />
          {leader.trendDelta}
        </span>
      </div>
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-semibold text-slate-500">Popularity Score</span>
          <span className="font-bold text-slate-900">{leader.popularity}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-500"
            style={{ width: `${leader.popularity}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {leader.votesToday}
        </span>
        <button className="rounded-xl bg-teal-50 px-4 py-2 text-sm font-bold text-teal-600 transition-all hover:bg-teal-600 hover:text-white">
          Vote
        </button>
      </div>
    </div>
  );
}

export function TrendingLeadersSection({ leaders }: { leaders: Leader[] }) {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-slate-900">
              Trending Leaders
            </h2>
            <p className="font-medium text-slate-500">
              Top popularity rankings based on today&apos;s voting activity.
            </p>
          </div>
          <a href="#" className="flex items-center gap-1 font-bold text-teal-600 transition-all hover:gap-2">
            View All <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
