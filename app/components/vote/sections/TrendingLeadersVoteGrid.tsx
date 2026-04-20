import Link from "next/link";
import type { TrendingVoteLeader } from "../types";
import { VoteLeaderCard } from "../VoteLeaderCard";

type TrendingLeadersVoteGridProps = {
  leaders: TrendingVoteLeader[];
};

export function TrendingLeadersVoteGrid({ leaders }: TrendingLeadersVoteGridProps) {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Other Trending Leaders</h2>
          <p className="font-medium text-slate-500">
            Quickly cast votes for other active political figures.
          </p>
        </div>
        <Link
          href="/regions"
          className="flex items-center gap-1 font-bold text-teal-600 transition-all hover:gap-2"
        >
          View All <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {leaders.map((leader) => (
          <VoteLeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
    </section>
  );
}
