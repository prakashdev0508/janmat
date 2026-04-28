import { DashboardPage } from "../components/dashboard/DashboardPage";
import type { Metadata } from "next";
import { seoMetadata } from "../seo/metadata";

export const metadata: Metadata = seoMetadata.dashboard;

export default function DashboardRoutePage() {
  return <DashboardPage />;
}
