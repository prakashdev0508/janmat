import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { comparisonPageData } from "./comparisonData";
import { ComparisonHeader } from "./sections/ComparisonHeader";
import { LeaderComparisonGrid } from "./sections/LeaderComparisonGrid";
import { ComparisonMetricsTable } from "./sections/ComparisonMetricsTable";

export function ComparisonPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="compare" />
      <main className="flex-1 pt-20">
        <ComparisonHeader />
        <LeaderComparisonGrid leaders={comparisonPageData.leaders} />
        <ComparisonMetricsTable
          leaders={comparisonPageData.leaders}
          metricRows={comparisonPageData.metricRows}
        />
      </main>
      <AppFooter />
    </div>
  );
}
