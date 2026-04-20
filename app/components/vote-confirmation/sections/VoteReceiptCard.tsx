import { ShieldCheck } from "lucide-react";
import type { VoteReceipt } from "../types";

type VoteReceiptCardProps = {
  receipt: VoteReceipt;
};

export function VoteReceiptCard({ receipt }: VoteReceiptCardProps) {
  return (
    <section className="px-6 pb-6">
      <div className="glass-card mx-auto max-w-4xl rounded-[32px] p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Vote Receipt</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Leader
            </p>
            <p className="mt-1 font-bold text-slate-900">{receipt.leaderName}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Vote
            </p>
            <p className="mt-1 font-bold text-slate-900 capitalize">{receipt.choice}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Submitted
            </p>
            <p className="mt-1 font-bold text-slate-900">{receipt.submittedAtLabel}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Reference
            </p>
            <p className="mt-1 font-bold text-slate-900">{receipt.referenceId}</p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-teal-100 bg-teal-50 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-teal-700" />
          <p className="text-xs font-medium text-teal-800">
            Your vote is anonymous and stored without personal attribution.
          </p>
        </div>
      </div>
    </section>
  );
}
