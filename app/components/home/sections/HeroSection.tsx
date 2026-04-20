import { TrendingUp, Vote } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden px-6 pt-24 pb-32">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
          <span className="status-pulse h-2 w-2 rounded-full bg-teal-500" />
          Live: 42,109 people voting right now
        </div>
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-7xl">
          The Real-Time Pulse of{" "}
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Indian Democracy
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
          Every voice counts, every day. Track the continuous popularity of
          political leaders across 4,000+ constituencies.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-teal-600/20 transition-all hover:bg-teal-700 sm:w-auto"
          >
            <Vote className="h-5 w-5" />
            Cast Your Vote Now
          </a>
          <a
            href="#"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:w-auto"
          >
            <TrendingUp className="h-5 w-5" />
            Explore Trends
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-full max-w-5xl -translate-x-1/2 opacity-30">
        <div className="flex h-full items-end justify-center gap-2 rounded-t-[100px] border-x border-t border-slate-200 p-4">
          <div className="h-[40%] w-12 rounded-t-lg bg-teal-100" />
          <div className="h-[65%] w-12 rounded-t-lg bg-teal-200" />
          <div className="h-[50%] w-12 rounded-t-lg bg-teal-100" />
          <div className="h-[85%] w-12 rounded-t-lg bg-emerald-100" />
          <div className="h-[60%] w-12 rounded-t-lg bg-teal-50" />
          <div className="h-[75%] w-12 rounded-t-lg bg-teal-100" />
        </div>
      </div>
    </section>
  );
}
