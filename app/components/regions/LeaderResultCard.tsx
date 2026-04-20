import Image from "next/image";
import Link from "next/link";
import { TrendingDown, TrendingUp, Vote } from "lucide-react";
import type { LeaderResult } from "./types";

const regionBadgeClasses: Record<string, string> = {
  "Union Government": "bg-orange-50 text-orange-700 border-orange-100",
  "Main Opposition": "bg-blue-50 text-blue-700 border-blue-100",
  "West Bengal": "bg-green-50 text-green-700 border-green-100",
  Delhi: "bg-yellow-50 text-yellow-700 border-yellow-100",
  "Uttar Pradesh": "bg-orange-50 text-orange-700 border-orange-100",
  Bihar: "bg-slate-100 text-slate-700 border-slate-200",
};

export function LeaderResultCard({ leader }: { leader: LeaderResult }) {
  const TrendIcon = leader.trendDirection === "up" ? TrendingUp : TrendingDown;
  const trendTextClass =
    leader.trendDirection === "up" ? "text-teal-600" : "text-red-500";
  const badgeClass =
    regionBadgeClasses[leader.region] ??
    "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <article className="glass-card relative rounded-3xl p-6 transition-all hover:border-teal-400/60 hover:shadow-lg">
      <div className="absolute top-6 right-6 text-2xl font-bold text-teal-600">
        {leader.sentiment}%
      </div>

      <div className="mb-4 flex items-start gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-4 ring-slate-50 transition-all">
          <Image
            src={leader.avatarUrl}
            alt={leader.name}
            width={80}
            height={80}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="pt-1">
          <h3 className="text-xl leading-tight font-bold text-slate-900">
            {leader.name}
          </h3>
          <p className="mb-2 text-sm font-bold text-slate-500">
            {leader.role} | {leader.party}
          </p>
          <span
            className={`inline-block rounded-lg border px-3 py-1 text-[10px] font-bold uppercase ${badgeClass}`}
          >
            {leader.region}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center gap-1 ${trendTextClass}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="uppercase tracking-wider">{leader.trendValue} Today</span>
          </div>
          <span className="text-slate-400 uppercase tracking-wider">
            Sentiment Rating
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-500"
            style={{ width: `${leader.sentiment}%` }}
          />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Votes Received (Today)
        </span>
        <span className="text-base font-bold text-slate-900">{leader.votesToday}</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={`/vote?leader=${leader.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700"
        >
          <Vote className="h-4 w-4" />
          Vote
        </Link>
        <Link
          href={`/leaders/${leader.id}`}
          className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-center text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
