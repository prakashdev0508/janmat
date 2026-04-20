import { notFound } from "next/navigation";
import { LeaderProfilePage } from "../../components/leader-profile/LeaderProfilePage";
import { getLeaderProfileData } from "../../components/leader-profile/leaderProfileData";

type LeaderPageProps = {
  params: Promise<{ leaderId: string }>;
};

export default async function LeaderRoutePage({ params }: LeaderPageProps) {
  const { leaderId } = await params;
  const profile = getLeaderProfileData(leaderId);

  if (!profile) {
    notFound();
  }

  return <LeaderProfilePage profile={profile} />;
}
