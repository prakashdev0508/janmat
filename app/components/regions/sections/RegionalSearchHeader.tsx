import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function RegionalSearchHeader() {
  return (
    <header className="hero-gradient border-b border-slate-200 px-6 pt-32 pb-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-sm font-bold tracking-wider text-slate-500 uppercase md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="transition-colors hover:text-teal-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4" />
                <span className="text-teal-600">Regional Search</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
          Search Leaders by Region
        </h1>
        <p className="max-w-2xl font-medium text-slate-600">
          Explore political sentiment across India. Filter by state, party, or
          popularity to find your representatives.
        </p>
      </div>
    </header>
  );
}
