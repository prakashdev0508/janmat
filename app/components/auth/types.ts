import type { LucideIcon } from "lucide-react";

export interface LoginFeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialProvider {
  id: "google" | "github";
  label: string;
}

export interface LegalLink {
  label: string;
  href: string;
}
