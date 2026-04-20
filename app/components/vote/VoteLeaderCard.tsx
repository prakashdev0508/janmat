import Image from "next/image";
import Link from "next/link";
import type { TrendingVoteLeader } from "./types";

type VoteLeaderCardProps = {
  leader: TrendingVoteLeader;
};

export function VoteLeaderCard({ leader }: VoteLeaderCardProps) {
  return (
    <article className="glass-card group rounded-3xl p-5 transition-all hover:border-teal-400/60 hover:shadow-lg">
      <Link
        href="/compare"
        className="mb-4 flex items-center gap-4 transition-opacity hover:opacity-80"
      >
        <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-slate-100 transition-all group-hover:ring-teal-200">
          <Image
            src={leader.avatarUrl}
            alt={leader.name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="overflow-hidden">
          <h3 className="truncate text-lg font-bold text-slate-900">{leader.name}</h3>
          <p className="truncate text-xs font-medium text-slate-500">
            {leader.role} | {leader.party}
          </p>
        </div>
      </Link>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="font-bold text-slate-500">Score</span>
          <span className="font-bold text-teal-600">{leader.popularity}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-500"
            style={{ width: `${leader.popularity}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`/vote/confirmation?leader=${leader.id}&choice=approve`}
          className="flex items-center justify-center rounded-xl bg-teal-50 py-2 text-xs font-bold text-teal-600 transition-all hover:bg-teal-600 hover:text-white"
        >
          Approve
        </Link>
        <Link
          href={`/vote/confirmation?leader=${leader.id}&choice=disapprove`}
          className="flex items-center justify-center rounded-xl bg-slate-50 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-orange-500 hover:text-white"
        >
          Reject
        </Link>
      </div>
    </article>
  );
}
