import { Suspense } from "react";
import { RegionalSearchPage } from "../components/regions/RegionalSearchPage";

export default function RegionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RegionalSearchPage />
    </Suspense>
  );
}
