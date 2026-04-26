import { HomePage } from "./components/home/HomePage";
import { fallbackHomePageData, getCachedHomePageData } from "@/lib/home-page-data";

export default async function Home() {
  let data = fallbackHomePageData;

  try {
    data = await getCachedHomePageData();
  } catch {
    data = fallbackHomePageData;
  }

  return <HomePage data={data} />;
}
