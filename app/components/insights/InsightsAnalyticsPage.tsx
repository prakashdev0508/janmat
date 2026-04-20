import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { insightsAnalyticsData } from "./insightsData";
import { InsightsHeader } from "./sections/InsightsHeader";
import { InsightsKpiGrid } from "./sections/InsightsKpiGrid";
import { LeaderMomentumSection } from "./sections/LeaderMomentumSection";
import { NationalTrendSection } from "./sections/NationalTrendSection";
import { RegionalHeatSection } from "./sections/RegionalHeatSection";

export function InsightsAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav activeLink="nav-stats" />
      <main className="flex-1 pt-24">
        <InsightsHeader />
        <InsightsKpiGrid items={insightsAnalyticsData.kpis} />
        <NationalTrendSection points={insightsAnalyticsData.trendSeries} />
        <RegionalHeatSection items={insightsAnalyticsData.regionalInsights} />
        <LeaderMomentumSection items={insightsAnalyticsData.leaderMomentum} />
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
