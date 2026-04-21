import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ComparisonBreadcrumb } from "../types";

type ComparisonHeaderProps = {
  breadcrumbs: ComparisonBreadcrumb[];
};

export function ComparisonHeader({ breadcrumbs }: ComparisonHeaderProps) {
  return (
    <section className="hero-gradient border-b border-slate-200 px-6 pt-12 pb-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-400">
          {breadcrumbs.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-teal-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-teal-600">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 ? (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              ) : null}
            </div>
          ))}
        </nav>
        <h1 className="mb-2 text-4xl font-bold text-slate-900 md:text-5xl">Compare Leaders</h1>
        <p className="text-lg font-medium text-slate-500">
          See how your favorite leaders stack up against each other.
        </p>
      </div>
    </section>
  );
}
