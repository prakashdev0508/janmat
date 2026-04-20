import type { StepItem } from "../homeData";
import { BarChart3, Fingerprint, Search, ShieldCheck } from "lucide-react";

const iconMap = {
  search: Search,
  fingerprint: Fingerprint,
  "shield-check": ShieldCheck,
  "bar-chart": BarChart3,
} as const;

export function HowItWorksSection({ steps }: { steps: StepItem[] }) {
  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="mx-auto max-w-2xl font-medium text-slate-600">
            JanMat isn&apos;t an election, it&apos;s a daily sentiment tracker
            that reflects the evolving will of the people.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 shadow-sm">
                {(() => {
                  const Icon = iconMap[step.icon as keyof typeof iconMap];
                  return Icon ? <Icon className="h-6 w-6 text-teal-600" /> : null;
                })()}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed font-medium text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
