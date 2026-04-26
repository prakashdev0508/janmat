export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-7 w-28 animate-pulse rounded-md bg-slate-200" />
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-9 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-12">
        <div className="hero-gradient rounded-[32px] border border-slate-100 p-8">
          <div className="h-10 w-60 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={`global-loading-card-${index}`} className="glass-card rounded-3xl p-6">
              <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-5 h-2 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
