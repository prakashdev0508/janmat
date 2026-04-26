"use client";

import { useRouter } from "next/navigation";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { ComparisonAnalyticsPanel } from "./sections/ComparisonAnalyticsPanel";
import { ComparisonHeader } from "./sections/ComparisonHeader";
import { ComparisonSelectorSection } from "./sections/ComparisonSelectorSection";
import { LeaderComparisonGrid } from "./sections/LeaderComparisonGrid";
import { OtherComparisonsSection } from "./sections/OtherComparisonsSection";
import type { ComparisonPageData } from "./types";

type ComparisonPageProps = {
  data: ComparisonPageData;
};

export function ComparisonPage({ data }: ComparisonPageProps) {
  const router = useRouter();

  const handlePairChange = (leaderOneId: string, leaderTwoId: string) => {
    if (!leaderOneId || !leaderTwoId || leaderOneId === leaderTwoId) return;
    const params = new URLSearchParams();
    params.set("leaderOne", leaderOneId);
    params.set("leaderTwo", leaderTwoId);
    router.replace(`/compare?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="compare" />
      <main className="flex-1 pt-20">
        <ComparisonHeader breadcrumbs={data.breadcrumbs} />
        <ComparisonSelectorSection
          allLeaders={data.allLeaders}
          fields={data.selectorFields}
          popularComparisons={data.popularComparisons}
          onPairChange={handlePairChange}
        />
        <LeaderComparisonGrid leaders={data.leaders} />
        <ComparisonAnalyticsPanel
          leaders={data.leaders}
          trendSeries={data.trendSeries}
          regionalPerformance={data.regionalPerformance}
          sentimentBreakdowns={data.sentimentBreakdowns}
          keyMetrics={data.keyMetrics}
        />
        <OtherComparisonsSection
          comparisons={data.otherComparisons}
          onSelectPair={handlePairChange}
        />
      </main>
      <AppFooter />
    </div>
  );
}
