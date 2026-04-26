import { InsightsAnalyticsPage } from "../components/insights/InsightsAnalyticsPage";
import {
  fallbackInsightsPageData,
  getCachedInsightsPageData,
} from "@/lib/insights-page-data";

export default async function InsightsRoutePage() {
  let data = fallbackInsightsPageData;

  try {
    data = await getCachedInsightsPageData();
  } catch {
    data = fallbackInsightsPageData;
  }

  return <InsightsAnalyticsPage data={data} />;
}
