import { BarChart3 } from "lucide-react";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900">
            Jan<span className="text-teal-600">Mat</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition-colors hover:text-teal-600">
            Explore Leaders
          </Link>
          <Link href="/insights" className="transition-colors hover:text-teal-600">
            Insights
          </Link>
          <Link href="/compare" className="transition-colors hover:text-teal-600">
            Comparison
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
          >
            Dashboard
          </Link>
          <button className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
