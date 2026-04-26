import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { fallbackInsightsPageData } from "@/lib/insights-page-data";
import { InsightsHeader } from "./sections/InsightsHeader";
import { InsightsKpiGrid } from "./sections/InsightsKpiGrid";
import { LeaderMomentumSection } from "./sections/LeaderMomentumSection";
import { NationalTrendSection } from "./sections/NationalTrendSection";
import { RegionalHeatSection } from "./sections/RegionalHeatSection";
import type { InsightsAnalyticsData } from "./types";

type InsightsAnalyticsPageProps = {
  data?: InsightsAnalyticsData;
};

export function InsightsAnalyticsPage({
  data = fallbackInsightsPageData,
}: InsightsAnalyticsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav activeLink="nav-stats" />
      <main className="flex-1 pt-24">
        <InsightsHeader />
        <InsightsKpiGrid items={data.kpis} />
        <NationalTrendSection points={data.trendSeries} />
        <RegionalHeatSection items={data.regionalInsights} />
        <LeaderMomentumSection items={data.leaderMomentum} />
      </main>
      <AppFooter
        exploreHref="/"
        votingHref="/vote"
        verifyHref="/dashboard"
        apiHref="/insights"
        aboutHref="/"
        methodHref="/insights"
      />
    </div>
  );
}
