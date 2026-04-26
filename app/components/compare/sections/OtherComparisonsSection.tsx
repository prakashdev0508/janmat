import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { OtherComparisonCard } from "../types";

type OtherComparisonsSectionProps = {
  comparisons: OtherComparisonCard[];
  onSelectPair: (leaderOneId: string, leaderTwoId: string) => void;
};

export function OtherComparisonsSection({
  comparisons,
  onSelectPair,
}: OtherComparisonsSectionProps) {
  return (
    <section className="mt-24 px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Other Popular Comparisons</h2>
            <p className="font-medium text-slate-500">
              See how other leaders compare in current sentiment.
            </p>
          </div>
          <Link
            href="/compare"
            className="flex items-center gap-1 font-bold text-teal-600 transition-all hover:gap-2"
          >
            View All Comparisons
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((comparison) => (
            <article
              key={comparison.title}
              className="glass-card rounded-3xl p-6 transition-all hover:border-teal-400"
            >
              <div className="mb-6 flex items-center justify-center gap-2">
                <Image
                  src={comparison.leaderOneAvatar}
                  alt={comparison.title}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-white ring-2 ring-slate-100"
                  unoptimized
                />
                <span className="text-xs font-bold text-slate-300">VS</span>
                <Image
                  src={comparison.leaderTwoAvatar}
                  alt={comparison.title}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-white ring-2 ring-slate-100"
                  unoptimized
                />
              </div>
              <h4 className="mb-4 text-center font-bold text-slate-900">{comparison.title}</h4>
              <button
                type="button"
                onClick={() => onSelectPair(comparison.leaderOneId, comparison.leaderTwoId)}
                className="w-full rounded-xl border border-slate-100 bg-slate-50 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-teal-50 hover:text-teal-600"
              >
                Compare
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
