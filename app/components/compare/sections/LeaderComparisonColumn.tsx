import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ComparedLeader } from "../types";

type LeaderComparisonColumnProps = {
  leader: ComparedLeader;
};

function buildTrendPath(points: ComparedLeader["trendPoints"]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

export function LeaderComparisonColumn({ leader }: LeaderComparisonColumnProps) {
  const isPositive = leader.sentimentDelta.startsWith("+");
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="glass-card flex flex-col overflow-hidden rounded-[40px]">
      <div className="border-b border-slate-100 bg-slate-50 p-8 pb-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-[32px] bg-white ring-4 ring-teal-100">
            <Image
              src={leader.avatarUrl}
              alt={leader.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
          {leader.isLeader ? (
            <div className="rounded-full bg-teal-600 px-4 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase">
              Sentiment Leader
            </div>
          ) : null}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{leader.name}</h2>
        <p className="mb-1 font-medium text-slate-500">
          {leader.role} | {leader.party}
        </p>
        <p className="text-sm text-slate-400">{leader.profileType}</p>
      </div>

      <div className="flex flex-1 flex-col gap-10 p-8">
        <div className="space-y-3">
          <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Popularity
          </p>
          <div className="flex items-end justify-between">
            <span className="text-5xl font-black text-slate-900">
              {leader.sentiment}
              <span className="text-2xl">%</span>
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <TrendIcon className="h-4 w-4" />
              {leader.sentimentDelta}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${leader.sentiment}%` }}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Daily Volume
          </p>
          <p className="text-2xl font-bold text-slate-900">{leader.dailyVolume}</p>
          <p className="text-sm font-medium text-slate-500">Votes in last 24 hours</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Stronghold
          </p>
          <div className="inline-block rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
            {leader.stronghold}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Trend
          </p>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <svg viewBox="0 0 100 80" className="h-16 w-full">
              <path
                d={buildTrendPath(leader.trendPoints)}
                fill="none"
                stroke="#0d9488"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-xs font-semibold text-slate-500">{leader.trendLabel}</p>
          </div>
        </div>
      </div>

      <div className="p-8 pt-0">
        <Link
          href={`/leaders/${leader.id}`}
          className="block w-full rounded-2xl bg-teal-600 py-3 text-center text-sm font-bold text-white transition-all hover:bg-teal-700"
        >
          Full Profile
        </Link>
      </div>
    </article>
  );
}
