import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { votePageData } from "./voteData";
import { TrendingLeadersVoteGrid } from "./sections/TrendingLeadersVoteGrid";
import { VoteActionsPanel } from "./sections/VoteActionsPanel";
import { VoteBreadcrumb } from "./sections/VoteBreadcrumb";
import { VoteHeroCard } from "./sections/VoteHeroCard";
import { VoteTrustMeta } from "./sections/VoteTrustMeta";

export function VotingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <main className="flex-1 pb-20 pt-24">
        <VoteBreadcrumb />
        <VoteHeroCard leader={votePageData.featuredLeader} />
        <section className="mx-auto mt-6 max-w-4xl px-6">
          <div className="glass-card rounded-[40px] p-8 md:p-12">
            <VoteActionsPanel leaderId={votePageData.featuredLeader.id} />
            <VoteTrustMeta voteWindow={votePageData.voteWindow} />
          </div>
        </section>
        <TrendingLeadersVoteGrid leaders={votePageData.trendingLeaders} />
      </main>
      <AppFooter />
    </div>
  );
}
