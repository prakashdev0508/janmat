import { TrendingUp } from "lucide-react";
import type { ApprovalBreakdownItem } from "../types";

type PopularityScoreSectionProps = {
  popularity: number;
  popularityDelta: string;
  approvalBreakdown: ApprovalBreakdownItem[];
};

export function PopularityScoreSection({
  popularity,
  popularityDelta,
  approvalBreakdown,
}: PopularityScoreSectionProps) {
  return (
    <section className="glass-card overflow-hidden rounded-[32px]">
      <div className="border-b border-slate-100 bg-white p-10">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative flex items-center justify-center">
            <svg className="h-56 w-56 -rotate-90">
              <circle cx="112" cy="112" r="100" stroke="#f1f5f9" strokeWidth="16" fill="none" />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="#0d9488"
                strokeWidth="16"
                fill="none"
                strokeDasharray="628"
                strokeDashoffset={628 - (628 * popularity) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-slate-900">{popularity}%</span>
              <span className="mt-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                Popularity
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <TrendingUp className="h-4 w-4" />
              {popularityDelta} from yesterday
            </div>
            <h3 className="mb-4 text-2xl font-bold">Approval Breakdown</h3>
            <div className="space-y-6">
              {approvalBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-slate-700">
                      {item.label} ({item.votesLabel})
                    </span>
                    <span className="text-slate-900">{item.value}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.colorClass}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
