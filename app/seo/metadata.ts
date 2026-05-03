import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const seoMetadata = {
  root: {
    metadataBase: new URL(siteUrl),
    title: {
      default: "JannMat",
      template: "%s | JannMat",
    },
    description: "The real-time pulse of Indian democracy.",
    applicationName: "JannMat",
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "JannMat",
      url: siteUrl,
      title: "JannMat — Live political sentiment in India",
      description: "The real-time pulse of Indian democracy.",
    },
    twitter: {
      card: "summary_large_image",
      title: "JannMat — Live political sentiment in India",
      description: "The real-time pulse of Indian democracy.",
    },
  } satisfies Metadata,
  home: {
    title: "Live Political Sentiment and Leader Ratings in India",
    description:
      "Track live public sentiment, compare leaders, and explore democratic insights across India.",
  } satisfies Metadata,
  login: {
    title: "Secure Login to JannMat",
    description:
      "Sign in to JannMat to access personalized insights, voting actions, and your dashboard.",
  } satisfies Metadata,
  dashboard: {
    title: "Your Political Pulse Dashboard",
    description:
      "View your voting activity, engagement metrics, and personalized political trend snapshots.",
  } satisfies Metadata,
  vote: {
    title: "Cast Your Vote on Indian Leaders",
    description:
      "Cast your stance on national leaders and contribute to real-time democratic sentiment.",
  } satisfies Metadata,
  voteConfirmation: {
    title: "Your Vote Confirmation and Receipt",
    description:
      "Review your vote receipt and confirmation details after submitting your opinion.",
  } satisfies Metadata,
  compare: {
    title: "Compare Indian Leaders Side by Side",
    description:
      "Compare two leaders side by side with sentiment, performance, and public opinion signals.",
  } satisfies Metadata,
  regions: {
    title: "Regional Political Trends Across India",
    description:
      "Explore voting patterns and leader sentiment across Indian states and regions.",
  } satisfies Metadata,
  insights: {
    title: "Election Insights and Public Opinion Analytics",
    description:
      "Discover analytics, trends, and actionable intelligence from live democratic data.",
  } satisfies Metadata,
  leadersUpload: {
    title: "Leader Profile Upload and Management",
    description:
      "Manage and upload leader records to keep JannMat profiles accurate and up to date.",
  } satisfies Metadata,
  leaderProfile: {
    title: "Indian Leader Profile, Ratings and Public Sentiment",
    description:
      "View detailed leader profiles, ratings, and evolving public sentiment on JannMat.",
  } satisfies Metadata,
} as const;
