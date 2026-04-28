import { CheckCircle2 } from "lucide-react";
import type { VoteReceipt } from "../types";

type ConfirmationHeroProps = {
  receipt: VoteReceipt;
};

export function ConfirmationHero({ receipt }: ConfirmationHeroProps) {
  const choiceLabel = receipt.choice === "approve" ? "Approved" : "Disapproved";

  return (
    <section className="px-6 pt-10 pb-6">
      <div className="glass-card mx-auto max-w-4xl rounded-[40px] p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-600" />
        <h1 className="mb-2 text-4xl font-bold text-slate-900 md:text-5xl">Vote Confirmed</h1>
        <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500">
          You successfully <span className="font-bold text-slate-900">{choiceLabel}</span>{" "}
          <span className="font-bold text-teal-600">{receipt.leaderName}</span>. Thanks for
          participating in JannMat&apos;s transparent sentiment process.
        </p>
      </div>
    </section>
  );
}
