import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { confirmationActions, relatedVotePrompts } from "./voteConfirmationData";
import type { VoteReceipt } from "./types";
import { ConfirmationHero } from "./sections/ConfirmationHero";
import { NextActionsGrid } from "./sections/NextActionsGrid";
import { RelatedLeadersPrompt } from "./sections/RelatedLeadersPrompt";
import { VoteReceiptCard } from "./sections/VoteReceiptCard";

type VoteConfirmationPageProps = {
  receipt: VoteReceipt;
};

export function VoteConfirmationPage({ receipt }: VoteConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav activeLink="nav-explore" />
      <main className="flex-1 pt-24">
        <ConfirmationHero receipt={receipt} />
        <VoteReceiptCard receipt={receipt} />
        <NextActionsGrid actions={confirmationActions} />
        <RelatedLeadersPrompt items={relatedVotePrompts} />
      </main>
      <AppFooter
        exploreHref="/"
        votingHref="/vote"
        verifyHref="/dashboard"
        apiHref="/insights"
        aboutHref="/"
        methodHref="/insights"
      />
    </div>
  );
}
