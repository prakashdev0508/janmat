import type { RecentVoteItem } from "../types";

type RecentVotesPanelProps = {
  votes: RecentVoteItem[];
};

export function RecentVotesPanel({ votes }: RecentVotesPanelProps) {
  return (
    <section className="glass-card rounded-[32px] p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-900">Recent Voting Activity</h3>
      <div className="space-y-3">
        {votes.map((vote) => {
          const isApprove = vote.voteType === "approve";
          return (
            <div
              key={vote.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{vote.leaderName}</p>
                <p className="text-xs font-medium text-slate-500">{vote.timestamp}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                  isApprove ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
                }`}
              >
                {isApprove ? "Approve" : "Reject"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
