import { CheckSquare, MapPin, TrendingUp } from "lucide-react";
import type { LegalLink, LoginFeatureCard, SocialProvider } from "./types";

export const loginFeatureCards: LoginFeatureCard[] = [
  {
    title: "Real-time Voting",
    description: "Cast your vote instantly on national issues.",
    icon: CheckSquare,
  },
  {
    title: "Track Leaders",
    description: "Monitor popularity changes as they happen.",
    icon: TrendingUp,
  },
  {
    title: "See Trends",
    description: "Deep-dive into regional sentiment analysis.",
    icon: MapPin,
  },
];

export const socialProviders: SocialProvider[] = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
];

export const loginLegalLinks: LegalLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Support", href: "/support" },
];
