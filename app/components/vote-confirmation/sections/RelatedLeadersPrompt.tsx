import Link from "next/link";
import type { RelatedVotePromptItem } from "../types";

type RelatedLeadersPromptProps = {
  items: RelatedVotePromptItem[];
};

export function RelatedLeadersPrompt({ items }: RelatedLeadersPromptProps) {
  return (
    <section className="px-6 pb-16">
      <div className="glass-card mx-auto max-w-7xl rounded-[32px] p-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Continue Voting</h2>
            <p className="text-sm font-medium text-slate-500">
              Cast your sentiment on other trending leaders.
            </p>
          </div>
          <Link href="/regions" className="text-sm font-bold text-teal-600 hover:underline">
            Browse All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 transition-all hover:border-teal-300 hover:bg-teal-50"
            >
              <p className="font-bold text-slate-900">{item.name}</p>
              <p className="text-xs font-medium text-slate-500">{item.party}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
