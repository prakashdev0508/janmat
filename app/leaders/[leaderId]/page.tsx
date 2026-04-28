import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LeaderProfilePage } from "../../components/leader-profile/LeaderProfilePage";
import { getLeaderProfileData } from "../../components/leader-profile/leaderProfileData";
import { seoMetadata } from "../../seo/metadata";

export const metadata: Metadata = seoMetadata.leaderProfile;

type LeaderPageProps = {
  params: Promise<{ leaderId: string }>;
};

export default async function LeaderRoutePage({ params }: LeaderPageProps) {
  const { leaderId } = await params;
  const profile = await getLeaderProfileData(leaderId);

  if (!profile) {
    notFound();
  }

  return <LeaderProfilePage profile={profile} />;
}
