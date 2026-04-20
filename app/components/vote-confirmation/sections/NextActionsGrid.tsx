import Link from "next/link";
import type { ConfirmationActionItem } from "../types";

type NextActionsGridProps = {
  actions: ConfirmationActionItem[];
};

export function NextActionsGrid({ actions }: NextActionsGridProps) {
  return (
    <section className="px-6 pb-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">What Next?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="glass-card rounded-3xl p-5 transition-all hover:border-teal-400/60 hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-bold text-slate-900">{action.label}</h3>
              <p className="text-sm font-medium text-slate-500">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
