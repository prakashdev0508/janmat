import Image from "next/image";
import Link from "next/link";
import type { RecommendationLeader } from "../types";

type RecommendationsPanelProps = {
  leaders: RecommendationLeader[];
  votesByLeader: Record<string, "approve" | "reject" | undefined>;
  onVote: (leaderId: string, vote: "approve" | "reject") => void;
};

export function RecommendationsPanel({
  leaders,
  votesByLeader,
  onVote,
}: RecommendationsPanelProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
          <p className="text-sm font-medium text-slate-500">
            Based on your interests in Maharashtra &amp; Environment
          </p>
        </div>
        <Link
          href="/regions"
          className="text-sm font-bold text-teal-600 transition-all hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {leaders.map((leader) => (
          <article
            key={leader.id}
            className="glass-card group rounded-3xl p-5 transition-all hover:border-teal-400/50"
          >
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={leader.avatarUrl}
                alt={leader.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl bg-slate-50"
                unoptimized
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-slate-900">{leader.name}</h3>
                <p className="text-xs font-medium text-slate-500">
                  {leader.role} | {leader.party}
                </p>
              </div>
              <span className="rounded-md bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700 uppercase">
                {leader.tag}
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Popularity
                </span>
                <span className="text-lg font-bold text-teal-600">{leader.popularity}%</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onVote(leader.id, "approve")}
                  className={`rounded-xl px-4 py-2 text-xs font-bold text-white transition-all ${
                    votesByLeader[leader.id] === "approve"
                      ? "bg-emerald-600 ring-2 ring-emerald-200"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {votesByLeader[leader.id] === "approve" ? "Approved" : "Approve"}
                </button>
                <button
                  type="button"
                  onClick={() => onVote(leader.id, "reject")}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                    votesByLeader[leader.id] === "reject"
                      ? "border-orange-300 bg-orange-100 text-orange-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  {votesByLeader[leader.id] === "reject" ? "Rejected" : "Reject"}
                </button>
              </div>
            </div>
            {votesByLeader[leader.id] ? (
              <p className="text-[11px] font-semibold text-slate-500">
                Vote submitted:{" "}
                <span className="text-slate-700 capitalize">{votesByLeader[leader.id]}</span>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
