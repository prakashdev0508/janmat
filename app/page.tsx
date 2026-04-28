import { HomePage } from "./components/home/HomePage";
import type { Metadata } from "next";
import { fallbackHomePageData, getCachedHomePageData } from "@/lib/home-page-data";
import { seoMetadata } from "./seo/metadata";

export const metadata: Metadata = seoMetadata.home;

export default async function Home() {
  let data = fallbackHomePageData;

  try {
    data = await getCachedHomePageData();
  } catch {
    data = fallbackHomePageData;
  }

  return <HomePage data={data} />;
}
