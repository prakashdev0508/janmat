import { AppNav } from "../components/shared/AppNav";

export default function VotePageLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <main className="flex-1 pb-20 pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass-card rounded-[40px] p-8 md:p-12">
            <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
              <div className="h-40 w-40 animate-pulse rounded-[40px] bg-slate-200 md:h-56 md:w-56" />
              <div className="flex-1 space-y-4">
                <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
                <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
              <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
            </div>
          </div>
        </div>

        <section className="mx-auto mt-20 max-w-7xl px-6">
          <div className="mb-8 h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="glass-card h-64 animate-pulse rounded-3xl bg-slate-200/60"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
