import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { comparisonPageData } from "./comparisonData";
import { ComparisonAnalyticsPanel } from "./sections/ComparisonAnalyticsPanel";
import { ComparisonHeader } from "./sections/ComparisonHeader";
import { ComparisonSelectorSection } from "./sections/ComparisonSelectorSection";
import { LeaderComparisonGrid } from "./sections/LeaderComparisonGrid";
import { OtherComparisonsSection } from "./sections/OtherComparisonsSection";

export function ComparisonPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="compare" />
      <main className="flex-1 pt-20">
        <ComparisonHeader breadcrumbs={comparisonPageData.breadcrumbs} />
        <ComparisonSelectorSection
          fields={comparisonPageData.selectorFields}
          popularComparisons={comparisonPageData.popularComparisons}
        />
        <LeaderComparisonGrid leaders={comparisonPageData.leaders} />
        <ComparisonAnalyticsPanel
          leaders={comparisonPageData.leaders}
          trendSeries={comparisonPageData.trendSeries}
          regionalPerformance={comparisonPageData.regionalPerformance}
          sentimentBreakdowns={comparisonPageData.sentimentBreakdowns}
          keyMetrics={comparisonPageData.keyMetrics}
        />
        <OtherComparisonsSection comparisons={comparisonPageData.otherComparisons} />
      </main>
      <AppFooter />
    </div>
  );
}
