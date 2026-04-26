import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { ComparedLeader } from "../types";

type LeaderComparisonColumnProps = {
  leader: ComparedLeader;
};

export function LeaderComparisonColumn({ leader }: LeaderComparisonColumnProps) {
  const partyClass =
    leader.partyColor === "orange"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700";
  const actionClass =
    leader.buttonVariant === "primary"
      ? "bg-teal-600 text-white hover:bg-teal-700 shadow-xl shadow-teal-600/20"
      : "border-2 border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-600";

  return (
    <article className="glass-card relative overflow-hidden rounded-[40px] p-8">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-teal-50 opacity-60 blur-2xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-8 border-slate-50 shadow-2xl transition-transform duration-500 group-hover:scale-105">
          <Image
            src={leader.avatarUrl}
            alt={leader.name}
            width={160}
            height={160}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <span
          className={`mb-3 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase ${partyClass}`}
        >
          {leader.party}
        </span>
        <h2 className="mb-1 text-3xl font-bold text-slate-900">{leader.name}</h2>
        <p className="mb-6 text-sm font-bold text-slate-500">{leader.role}</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold tracking-tighter text-teal-600">{leader.sentiment}%</span>
          <div className="mb-1 flex items-center gap-1 text-sm font-black text-emerald-500">
            <TrendingUp className="h-4 w-4" />
            <span>{leader.sentimentDelta}</span>
          </div>
        </div>
        <Link
          href={`/vote?leader=${leader.id}`}
          className={`mt-8 w-full max-w-xs rounded-2xl py-4 text-lg font-bold transition-all active:scale-95 ${actionClass}`}
        >
          {leader.buttonLabel}
        </Link>
      </div>
    </article>
  );
}
