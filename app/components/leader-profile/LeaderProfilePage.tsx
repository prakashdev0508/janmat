import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import type { LeaderProfileData } from "./types";
import { CastVoteSection } from "./sections/CastVoteSection";
import { LeaderHeroCard } from "./sections/LeaderHeroCard";
import { PopularityScoreSection } from "./sections/PopularityScoreSection";
import { RecentActivityTimeline } from "./sections/RecentActivityTimeline";
import { RegionalPerformanceSection } from "./sections/RegionalPerformanceSection";
import { RelatedLeadersSection } from "./sections/RelatedLeadersSection";
import { VotingStatsStrip } from "./sections/VotingStatsStrip";

type LeaderProfilePageProps = {
  profile: LeaderProfileData;
};

export function LeaderProfilePage({ profile }: LeaderProfilePageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav activeLink="nav-explore" regionsHref="/regions" />
      <main className="flex-1 pt-20">
        <LeaderHeroCard meta={profile.meta} />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-20 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <PopularityScoreSection
              popularity={profile.popularity}
              popularityDelta={profile.popularityDelta}
              approvalBreakdown={profile.approvalBreakdown}
            />
            <RegionalPerformanceSection items={profile.regionalSentiment} />
            <VotingStatsStrip stats={profile.votingStats} />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-4">
            <CastVoteSection leaderId={profile.meta.id} />
            <RecentActivityTimeline items={profile.timeline} />
          </div>
        </div>
        <RelatedLeadersSection leaders={profile.relatedLeaders} />
      </main>
      <AppFooter
        exploreHref="/regions"
        votingHref="/vote"
        verifyHref="/dashboard"
        apiHref="/insights"
        aboutHref="/insights"
        methodHref="/insights"
        privacyHref="/insights"
        contactHref="/insights"
        termsHref="/insights"
        cookiesHref="/insights"
      />
    </div>
  );
}
