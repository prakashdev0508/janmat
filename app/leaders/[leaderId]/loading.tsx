import { AppNav } from "@/app/components/shared/AppNav";

export default function LeaderProfileLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav activeLink="nav-explore" regionsHref="/regions" />
      <main className="flex-1 pt-20">
        <section className="hero-gradient px-6 pt-16 pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="glass-card flex flex-col items-center gap-10 rounded-[40px] border-teal-100/50 p-8 md:flex-row md:p-12 md:gap-16">
              <div className="h-[200px] w-[200px] animate-pulse rounded-[48px] bg-slate-200" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
                <div className="h-6 w-72 animate-pulse rounded bg-slate-200" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-5 animate-pulse rounded bg-slate-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-20 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <div className="glass-card h-[420px] animate-pulse rounded-[32px] bg-slate-200/60" />
            <div className="glass-card h-[300px] animate-pulse rounded-[32px] bg-slate-200/60" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="glass-card h-[120px] animate-pulse rounded-[24px] bg-slate-200/60"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-4">
            <div className="glass-card h-[250px] animate-pulse rounded-[32px] bg-slate-200/60" />
            <div className="glass-card h-[360px] animate-pulse rounded-[32px] bg-slate-200/60" />
          </div>
        </div>
      </main>
    </div>
  );
}
