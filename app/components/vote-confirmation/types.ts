export type VoteChoice = "approve" | "disapprove";

export interface VoteReceipt {
  referenceId: string;
  leaderId: string;
  leaderName: string;
  choice: VoteChoice;
  submittedAtLabel: string;
}

export interface ConfirmationActionItem {
  id: string;
  label: string;
  href: string;
  description: string;
}

export interface RelatedVotePromptItem {
  id: string;
  name: string;
  party: string;
  href: string;
}
