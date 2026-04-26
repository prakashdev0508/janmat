import Link from "next/link";
import { AlertTriangle, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="hero-gradient flex min-h-screen items-center justify-center px-6 py-20">
      <div className="glass-card w-full max-w-2xl rounded-[32px] border-2 border-slate-100 p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <p className="mb-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Error 404
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-500 sm:text-base">
          The page you are looking for does not exist, may have been moved, or the URL might be incorrect.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/regions"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-teal-400 hover:text-teal-600"
          >
            <Search className="h-4 w-4" />
            Explore Leaders
          </Link>
        </div>
      </div>
    </div>
  );
}
