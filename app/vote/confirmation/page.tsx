import { VoteConfirmationPage } from "../../components/vote-confirmation/VoteConfirmationPage";
import type { VoteChoice, VoteReceipt } from "../../components/vote-confirmation/types";
import { prisma } from "@/lib/prisma";

type VoteConfirmationRoutePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const leaderNameById: Record<string, string> = {
  modi: "Narendra Modi",
  rahul: "Rahul Gandhi",
  mamata: "Mamata Banerjee",
  kejriwal: "Arvind Kejriwal",
  yogi: "Yogi Adityanath",
};

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function VoteConfirmationRoutePage({
  searchParams,
}: VoteConfirmationRoutePageProps) {
  const params = (await searchParams) ?? {};
  const leaderId = getSingleValue(params.leader) ?? "modi";
  const choiceParam = getSingleValue(params.choice);
  const choice: VoteChoice = choiceParam === "disapprove" ? "disapprove" : "approve";
  const referenceSuffix = `${leaderId}-${choice}`.toUpperCase();
  const leader = await prisma.leader.findUnique({
    where: { id: leaderId },
    select: { name: true },
  });
  const resolvedLeaderName =
    leader?.name ?? leaderNameById[leaderId] ?? "Unknown Leader";

  const receipt: VoteReceipt = {
    referenceId: `JM-${referenceSuffix}`,
    leaderId,
    leaderName: resolvedLeaderName,
    choice,
    submittedAtLabel: "Just now",
  };

  return <VoteConfirmationPage receipt={receipt} />;
}
