import Link from "next/link";

type VoteActionsPanelProps = {
  leaderId: string;
};

export function VoteActionsPanel({ leaderId }: VoteActionsPanelProps) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Link
        href={`/vote/confirmation?leader=${leaderId}&choice=approve`}
        className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-teal-600 p-8 text-white shadow-xl shadow-teal-600/20 transition-all hover:scale-[1.02] hover:bg-teal-700 active:scale-95"
      >
        <span className="text-5xl transition-transform group-hover:rotate-12">👍</span>
        <span className="text-2xl font-bold">Approve</span>
        <p className="text-center text-sm text-teal-50 opacity-80">
          I support the current leadership and policies.
        </p>
      </Link>

      <Link
        href={`/vote/confirmation?leader=${leaderId}&choice=disapprove`}
        className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 text-slate-900 shadow-sm transition-all hover:scale-[1.02] hover:border-orange-500 hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/10 active:scale-95"
      >
        <span className="text-5xl text-orange-600 transition-transform group-hover:-rotate-12">
          👎
        </span>
        <span className="text-2xl font-bold">Disapprove</span>
        <p className="text-center text-sm text-slate-500">
          I am unhappy with the current performance.
        </p>
      </Link>
    </div>
  );
}
