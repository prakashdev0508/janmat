import Link from "next/link";

type CastVoteSectionProps = {
  leaderId: string;
};

export function CastVoteSection({ leaderId }: CastVoteSectionProps) {
  return (
    <section id="cast-vote" className="glass-card rounded-[32px] border-2 border-teal-100 p-8">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">Cast Your Vote</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="rounded-2xl bg-teal-600 p-4 font-bold text-white transition-all hover:bg-teal-700">
          Approve
        </button>
        <button className="rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 transition-all hover:bg-slate-50">
          Neutral
        </button>
        <button className="rounded-2xl border border-orange-200 bg-orange-50 p-4 font-bold text-orange-700 transition-all hover:bg-orange-100">
          Disapprove
        </button>
      </div>
      <p className="mb-6 text-sm font-medium text-slate-500">
        Vote options are currently visual in this phase. Continue to the voting flow for
        a complete submission experience.
      </p>
      <Link
        href={`/vote?leader=${leaderId}`}
        className="block rounded-[24px] bg-teal-600 py-4 text-center font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700"
      >
        Continue to Vote Flow
      </Link>
    </section>
  );
}
