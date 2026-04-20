import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { leaderResults, partyOptions, regionOptions, sortOptions } from "./regionsData";
import { RegionalFiltersSidebar } from "./sections/RegionalFiltersSidebar";
import { RegionalLeadersGrid } from "./sections/RegionalLeadersGrid";
import { RegionalPagination } from "./sections/RegionalPagination";
import { RegionalResultsToolbar } from "./sections/RegionalResultsToolbar";
import { RegionalSearchHeader } from "./sections/RegionalSearchHeader";

export function RegionalSearchPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="regions" />
      <RegionalSearchHeader />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
          <RegionalFiltersSidebar
            regions={regionOptions}
            parties={partyOptions}
            sortOptions={sortOptions}
          />

          <div className="flex-1">
            <RegionalResultsToolbar />
            <RegionalLeadersGrid leaders={leaderResults} />
            <RegionalPagination />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
