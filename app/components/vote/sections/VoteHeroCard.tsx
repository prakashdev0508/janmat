import Image from "next/image";
import type { FeaturedVoteLeader } from "../types";

type VoteHeroCardProps = {
  leader: FeaturedVoteLeader;
  isLoading?: boolean;
};

export function VoteHeroCard({ leader, isLoading = false }: VoteHeroCardProps) {
  if (isLoading) {
    return (
      <section className="mx-auto max-w-4xl px-6">
        <div className="glass-card relative overflow-hidden rounded-[40px] p-8 md:p-12">
          <div className="relative z-10">
            <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
              <div className="h-40 w-40 animate-pulse rounded-[40px] bg-slate-200 md:h-56 md:w-56" />
              <div className="flex-1 space-y-4">
                <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
                <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-52 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6">
      <div className="glass-card relative overflow-hidden rounded-[40px] p-8 md:p-12">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-50 opacity-60 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
            <div className="h-40 w-40 overflow-hidden rounded-[40px] bg-slate-100 ring-8 ring-slate-50 shadow-2xl md:h-56 md:w-56">
              <Image
                src={leader.avatarUrl}
                alt={leader.name}
                width={224}
                height={224}
                className="h-full w-full object-cover"
                unoptimized
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold tracking-wider text-teal-600 uppercase">
                Current Leader
              </div>
              <h1 className="mb-2 text-4xl font-bold text-slate-900 md:text-5xl">
                {leader.name}
              </h1>
              <p className="mb-4 text-xl font-medium text-slate-500">
                {leader.role} | <span className="text-orange-600">{leader.party}</span>
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                    Popularity Score
                  </span>
                  <span className="text-3xl font-bold text-teal-600">
                    {leader.popularity}%
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                    style={{ width: `${leader.popularity}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs font-bold text-slate-400">
                  <span>0% Approval</span>
                  <span>100% Approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
