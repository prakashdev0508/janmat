import { LeaderResultCard } from "../LeaderResultCard";
import type { LeaderResult } from "../types";

type RegionalLeadersGridProps = {
  leaders: LeaderResult[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export function RegionalLeadersGrid({
  leaders,
  isLoading = false,
  error = null,
  onRetry,
}: RegionalLeadersGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`leader-skeleton-${index}`}
            className="glass-card rounded-3xl p-6"
          >
            <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 flex items-center gap-4">
              <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
            <div className="mt-6 h-2 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-6 h-14 animate-pulse rounded-2xl bg-slate-200" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-11 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="text-sm font-medium text-rose-600">{error}</p>
        {onRetry ? (
          <button
            onClick={onRetry}
            className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Retry
          </button>
        ) : null}
      </div>
    );
  }

  if (leaders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-600">No leaders found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
      {leaders.map((leader) => (
        <LeaderResultCard key={leader.id} leader={leader} />
      ))}
    </div>
  );
}
