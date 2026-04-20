import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function VoteBreadcrumb() {
  return (
    <div className="mx-auto mb-8 max-w-7xl px-6">
      <nav className="flex items-center gap-2 text-sm font-bold text-slate-400">
        <Link href="/" className="transition-colors hover:text-teal-600">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/regions" className="transition-colors hover:text-teal-600">
          Explore
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-bold text-teal-600">Cast Vote</span>
      </nav>
    </div>
  );
}
