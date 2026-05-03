import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LeaderJsonLd } from "../../components/seo/LeaderJsonLd";
import { LeaderProfilePage } from "../../components/leader-profile/LeaderProfilePage";
import { getLeaderProfileData, getLeaderSeoSnapshot } from "../../components/leader-profile/leaderProfileData";
import { getAvatarUrl } from "@/lib/leader-metrics";

type LeaderPageProps = {
  params: Promise<{ leaderId: string }>;
};

export async function generateMetadata({ params }: LeaderPageProps): Promise<Metadata> {
  const { leaderId } = await params;
  const leader = await getLeaderSeoSnapshot(leaderId);
  if (!leader) {
    notFound();
  }

  const partyLabel = leader.party?.shortName ?? leader.party?.name ?? "";
  const stateLabel = leader.state?.name ?? "";
  const title = `${leader.name}${partyLabel ? ` (${partyLabel})` : ""}`;
  const description = `Live ratings and public sentiment for ${leader.name}${stateLabel ? ` — ${stateLabel}` : ""}. Compare approval trends on JannMat.`;
  const imageUrl = getAvatarUrl(leader.name);

  return {
    title,
    description,
    alternates: { canonical: `/leaders/${leader.id}` },
    openGraph: {
      title: `${title} | JannMat`,
      description,
      url: `/leaders/${leader.id}`,
      type: "profile",
      images: [{ url: imageUrl, alt: leader.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | JannMat`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LeaderRoutePage({ params }: LeaderPageProps) {
  const { leaderId } = await params;
  const profile = await getLeaderProfileData(leaderId);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <LeaderJsonLd meta={profile.meta} />
      <LeaderProfilePage profile={profile} />
    </>
  );
}
