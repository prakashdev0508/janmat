import { ArrowLeftRight, Plus, Share2 } from "lucide-react";

export function ComparisonHeader() {
  return (
    <section className="bg-white px-6 pt-16 pb-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase">
            <ArrowLeftRight className="h-4 w-4" />
            Head-to-Head
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Leader Sentiment Comparison
          </h1>
          <p className="text-lg font-medium text-slate-500">
            Analyze side-by-side performance metrics and regional strength of
            India&apos;s prominent political figures based on real-time voting data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-200">
            <Plus className="h-4 w-4" />
            Add Leader
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700">
            <Share2 className="h-4 w-4" />
            Share Stats
          </button>
        </div>
      </div>
    </section>
  );
}
