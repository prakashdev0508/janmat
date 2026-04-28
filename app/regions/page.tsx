import { Suspense } from "react";
import type { Metadata } from "next";
import { RegionalSearchPage } from "../components/regions/RegionalSearchPage";
import { seoMetadata } from "../seo/metadata";

export const metadata: Metadata = seoMetadata.regions;

export default function RegionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RegionalSearchPage />
    </Suspense>
  );
}
