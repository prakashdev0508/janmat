import { InsightsAnalyticsPage } from "../components/insights/InsightsAnalyticsPage";
import type { Metadata } from "next";
import {
  fallbackInsightsPageData,
  getCachedInsightsPageData,
} from "@/lib/insights-page-data";
import { seoMetadata } from "../seo/metadata";

export const metadata: Metadata = seoMetadata.insights;

export default async function InsightsRoutePage() {
  let data = fallbackInsightsPageData;

  try {
    data = await getCachedInsightsPageData();
  } catch {
    data = fallbackInsightsPageData;
  }

  return <InsightsAnalyticsPage data={data} />;
}
