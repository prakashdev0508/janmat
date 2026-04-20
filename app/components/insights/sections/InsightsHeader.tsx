export function InsightsHeader() {
  return (
    <section className="px-6 pt-10 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Insights Analytics
          </h1>
          <p className="text-lg font-medium text-slate-500">
            Deep, real-time sentiment analytics across citizens, regions, and
            political leaders.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Live tracking enabled
        </div>
      </div>
    </section>
  );
}
