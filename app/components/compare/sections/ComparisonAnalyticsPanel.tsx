import { Activity, LineChart, Map, PieChart } from "lucide-react";
import type {
  ComparedLeader,
  KeyMetricRow,
  RegionalPerformanceRow,
  SentimentBreakdown,
  TrendSeries,
} from "../types";
import { ComparisonMetricsTable } from "./ComparisonMetricsTable";

type ComparisonAnalyticsPanelProps = {
  leaders: ComparedLeader[];
  trendSeries: TrendSeries[];
  regionalPerformance: RegionalPerformanceRow[];
  sentimentBreakdowns: SentimentBreakdown[];
  keyMetrics: KeyMetricRow[];
};

export function ComparisonAnalyticsPanel({
  leaders,
  trendSeries,
  regionalPerformance,
  sentimentBreakdowns,
  keyMetrics,
}: ComparisonAnalyticsPanelProps) {
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card overflow-hidden rounded-[40px]">
          <div className="border-b border-slate-100 p-8">
            <div className="mb-10 flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <LineChart className="h-6 w-6 text-teal-600" />
                30-Day Popularity Trend
              </h3>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                Live Analytics
              </span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {trendSeries.map((series) => (
                <div key={series.label} className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-500">{series.label}</span>
                    <span className="text-teal-600">{series.momentumLabel}</span>
                  </div>
                  <div className="flex h-48 items-end gap-1 overflow-hidden rounded-2xl bg-slate-50 px-4">
                    {series.bars.map((bar, index) => (
                      <div
                        key={`${series.label}-${index}`}
                        className={`flex-1 rounded-t-sm ${
                          index === series.bars.length - 1
                            ? "bg-teal-600 shadow-lg"
                            : "bg-teal-200"
                        }`}
                        style={{ height: `${bar}%` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-slate-100 p-8">
            <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900">
              <Map className="h-6 w-6 text-teal-600" />
              Regional Performance Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                    <th className="py-4 pl-4">Region</th>
                    <th className="py-4">{leaders[0]?.name}</th>
                    <th className="py-4">Share</th>
                    <th className="py-4">{leaders[1]?.name}</th>
                    <th className="py-4 pr-4">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalPerformance.map((row) => (
                    <tr
                      key={row.region}
                      className="border-b border-slate-50 transition-colors hover:bg-slate-50"
                    >
                      <td className="py-4 pl-4">{row.region}</td>
                      <td className="py-4">{row.leaderOneVotes}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-teal-600">{row.leaderOneShare}%</span>
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full bg-teal-500"
                              style={{ width: `${row.leaderOneShare}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{row.leaderTwoVotes}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{row.leaderTwoShare}%</span>
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full bg-slate-300"
                              style={{ width: `${row.leaderTwoShare}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-b border-slate-100 p-8">
            <h3 className="mb-10 flex items-center gap-3 text-xl font-bold text-slate-900">
              <PieChart className="h-6 w-6 text-teal-600" />
              Sentiment Analysis
            </h3>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
              {sentimentBreakdowns.map((item) => {
                const leader = leaders.find((candidate) => candidate.id === item.leaderId);
                return (
                  <div key={item.leaderId} className="flex items-center gap-8">
                    <div className="relative h-32 w-32">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-slate-100"
                          strokeWidth="4"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-teal-500"
                          strokeWidth="4"
                          strokeDasharray={`${item.approval} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-black text-slate-900">{item.approval}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900">{leader?.name}</h4>
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-teal-500" />
                          Approval
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <span className="h-2 w-2 rounded-full bg-slate-200" />
                          Disapproval
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{item.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50/50 p-8">
            <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900">
              <Activity className="h-6 w-6 text-teal-600" />
              Key Comparison Metrics
            </h3>
            <ComparisonMetricsTable metricRows={keyMetrics} />
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <button
                type="button"
                className="rounded-2xl bg-teal-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-95"
              >
                Vote for Modi Now
              </button>
              <button
                type="button"
                className="rounded-2xl bg-teal-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-teal-600/20 transition-all hover:bg-teal-700 active:scale-95"
              >
                Vote for Rahul Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
