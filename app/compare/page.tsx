import { ComparisonPage } from "../components/compare/ComparisonPage";
import { getComparePageData } from "@/lib/compare-page-data";

type ComparePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = (await searchParams) ?? {};
  const leaderOne = getSingleValue(params.leaderOne);
  const leaderTwo = getSingleValue(params.leaderTwo);
  const data = await getComparePageData(leaderOne, leaderTwo);
  return <ComparisonPage data={data} />;
}
