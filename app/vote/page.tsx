import { VotingPage } from "../components/vote/VotingPage";
import type { Metadata } from "next";
import { seoMetadata } from "../seo/metadata";

export const metadata: Metadata = seoMetadata.vote;

export default function VoteRoutePage() {
  return <VotingPage />;
}
