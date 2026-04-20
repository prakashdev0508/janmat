import Image from "next/image";
import Link from "next/link";
import type { RelatedLeaderCard } from "../types";

type RelatedLeadersSectionProps = {
  leaders: RelatedLeaderCard[];
};

export function RelatedLeadersSection({ leaders }: RelatedLeadersSectionProps) {
  return (
    <section className="border-t border-slate-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-slate-900">Compare Sentiment</h2>
            <p className="font-medium text-slate-500">
              Top performing leaders this week across all regions.
            </p>
          </div>
          <Link
            href="/compare"
            className="font-bold text-teal-600 transition-all hover:underline"
          >
            Explore Trends
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="glass-card group rounded-[32px] p-6 transition-all hover:border-teal-400/60 hover:shadow-xl"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-slate-100 transition-all group-hover:ring-teal-200">
                  <Image
                    src={leader.avatarUrl}
                    alt={leader.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{leader.name}</h4>
                  <p className="text-xs font-bold tracking-tight text-slate-500 uppercase">
                    {leader.partyRegion}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-bold text-slate-400">Popularity</span>
                  <span className="font-bold text-slate-900">{leader.popularity}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-50">
                  <div
                    className="h-full rounded-full bg-teal-500"
                    style={{ width: `${leader.popularity}%` }}
                  />
                </div>
              </div>
              <Link
                href={`/vote?leader=${leader.id}`}
                className="block w-full rounded-2xl bg-teal-50 py-3 text-center text-sm font-bold text-teal-600 transition-all hover:bg-teal-600 hover:text-white"
              >
                Vote Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
