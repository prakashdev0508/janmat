import { Clock3, ShieldCheck } from "lucide-react";
import type { VoteWindowStatus } from "../types";

type VoteTrustMetaProps = {
  voteWindow: VoteWindowStatus;
};

export function VoteTrustMeta({ voteWindow }: VoteTrustMetaProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:flex-row">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-sm">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{voteWindow.title}</h4>
          <p className="text-sm text-slate-500">{voteWindow.description}</p>
        </div>
      </div>

      <div className="text-center md:text-right">
        <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
          Voting Window
        </p>
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Clock3 className="h-4 w-4 text-teal-600" />
          <span>{voteWindow.availabilityLabel}</span>
        </div>
      </div>
    </div>
  );
}
