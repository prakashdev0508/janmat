import type { ComparedLeader, ComparisonMetricRow } from "../types";

type ComparisonMetricsTableProps = {
  leaders: ComparedLeader[];
  metricRows: ComparisonMetricRow[];
};

const statusClassMap = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
} as const;

export function ComparisonMetricsTable({
  leaders,
  metricRows,
}: ComparisonMetricsTableProps) {
  return (
    <section className="border-t border-slate-100 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">
          Synchronized Historical Metrics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-6 text-left text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Parameter
                </th>
                {leaders.map((leader, index) => (
                  <th
                    key={leader.id}
                    className={`px-4 py-6 text-left text-sm font-bold tracking-wider uppercase ${
                      index === 0 ? "text-teal-600" : "text-slate-500"
                    }`}
                  >
                    {leader.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {metricRows.map((row) => (
                <tr key={row.parameter}>
                  <td className="px-4 py-6 font-bold text-slate-700">
                    {row.parameter}
                  </td>
                  {row.values.map((value, index) => (
                    <td key={`${row.parameter}-${leaders[index]?.id}`} className="px-4 py-6">
                      {value.status ? (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            statusClassMap[value.status]
                          }`}
                        >
                          {value.value}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-900">{value.value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
