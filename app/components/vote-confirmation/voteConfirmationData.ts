import type { ConfirmationActionItem, RelatedVotePromptItem } from "./types";

export const confirmationActions: ConfirmationActionItem[] = [
  {
    id: "explore",
    label: "Explore Leaders",
    href: "/regions",
    description: "Keep voting on active leaders across regions.",
  },
  {
    id: "insights",
    label: "View Insights",
    href: "/insights",
    description: "See real-time analytics from citizen sentiment.",
  },
  {
    id: "compare",
    label: "Compare Leaders",
    href: "/compare",
    description: "Review side-by-side leader performance trends.",
  },
  {
    id: "dashboard",
    label: "Open Dashboard",
    href: "/dashboard",
    description: "Track your streak, activity, and recommendations.",
  },
];

export const relatedVotePrompts: RelatedVotePromptItem[] = [
  { id: "rahul", name: "Rahul Gandhi", party: "INC", href: "/vote?leader=rahul" },
  { id: "mamata", name: "Mamata Banerjee", party: "AITC", href: "/vote?leader=mamata" },
  { id: "yogi", name: "Yogi Adityanath", party: "BJP", href: "/vote?leader=yogi" },
];
