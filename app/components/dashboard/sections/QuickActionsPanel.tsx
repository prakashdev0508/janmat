import Link from "next/link";
import { TrendingUp, Vote } from "lucide-react";

export function QuickActionsPanel() {
  return (
    <section className="space-y-3">
      <Link
        href="/regions"
        className="flex w-full items-center justify-center gap-3 rounded-[24px] bg-teal-600 py-4 font-bold text-white shadow-xl shadow-teal-600/20 transition-all hover:scale-[1.02]"
      >
        <Vote className="h-5 w-5" />
        Vote Now
      </Link>
      <Link
        href="/insights"
        className="flex w-full items-center justify-center gap-3 rounded-[24px] border border-slate-200 bg-white py-4 font-bold text-slate-700 shadow-sm transition-all hover:border-teal-400"
      >
        <TrendingUp className="h-5 w-5" />
        Explore Trends
      </Link>
    </section>
  );
}
