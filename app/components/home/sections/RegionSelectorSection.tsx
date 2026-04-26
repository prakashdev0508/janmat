"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";

export function RegionSelectorSection({ states }: { states: string[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const runSearch = () => {
    const normalized = query.trim();
    if (!normalized) {
      router.push("/regions");
      return;
    }
    router.push(`/regions?q=${encodeURIComponent(normalized)}`);
  };

  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Check Your Region</h2>
        <p className="font-medium text-slate-600">
          Find your local MP or MLA and see how they are performing in your
          constituency.
        </p>
      </div>

      <form
        className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch();
        }}
      >
        <div className="relative w-full flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search your constituency or district..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-700 shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm transition-all hover:border-teal-500 hover:text-teal-600"
        >
          <MapPin className="h-5 w-5" />
          Search
        </button>
      </form>

      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-center gap-3">
        {states.map((state) => (
          <Link
            key={state}
            href={`/regions?q=${encodeURIComponent(state)}`}
            className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
          >
            {state}
          </Link>
        ))}
      </div>
    </section>
  );
}
