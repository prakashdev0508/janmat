export type TrendDirection = "up" | "down";

export interface Leader {
  id?: string;
  name: string;
  role: string;
  avatarUrl: string;
  trend: TrendDirection;
  trendDelta: string;
  popularity: number;
  votesToday: string;
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface StepItem {
  title: string;
  description: string;
  icon: string;
}

export interface FooterGroup {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export const leaders: Leader[] = [
  {
    name: "Narendra Modi",
    role: "Prime Minister | BJP",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Narendra",
    trend: "up",
    trendDelta: "2.4%",
    popularity: 72.8,
    votesToday: "1.2M Votes Today",
  },
  {
    name: "Rahul Gandhi",
    role: "MP, Wayanad | INC",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    trend: "up",
    trendDelta: "1.8%",
    popularity: 48.2,
    votesToday: "840K Votes Today",
  },
  {
    name: "Mamata Banerjee",
    role: "Chief Minister | AITC",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamata",
    trend: "down",
    trendDelta: "0.5%",
    popularity: 52.4,
    votesToday: "420K Votes Today",
  },
];

export const stateChips: string[] = [
  "Uttar Pradesh",
  "Maharashtra",
  "West Bengal",
  "Tamil Nadu",
  "Karnataka",
  "Bihar",
  "More States...",
];

export const stats: StatItem[] = [
  { icon: "users", value: "24.5M+", label: "Total Votes Cast" },
  { icon: "activity", value: "1.2M", label: "Daily Active Users" },
  { icon: "map", value: "543+", label: "Constituencies" },
  { icon: "user-check", value: "4,120", label: "Leaders Tracked" },
];

export const howItWorksSteps: StepItem[] = [
  {
    title: "1. Find Your Leader",
    description:
      "Browse through our extensive database of MPs and MLAs by region, party, or name.",
    icon: "search",
  },
  {
    title: "2. Cast Daily Vote",
    description:
      "Express your approval or disapproval once every 24 hours. Your identity remains anonymous.",
    icon: "fingerprint",
  },
  {
    title: "3. Data Verification",
    description:
      "Our anti-bot algorithms ensure that every vote belongs to a real person.",
    icon: "shield-check",
  },
  {
    title: "4. View Live Trends",
    description:
      "Watch popularity charts evolve in real-time as public sentiment shifts based on policy.",
    icon: "bar-chart",
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Explore Trends", href: "/" },
      { label: "Voting Rules", href: "/dashboard" },
      { label: "Identity Verification", href: "/dashboard" },
      { label: "Public API", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/insights" },
      { label: "Methodology", href: "/insights" },
      { label: "Privacy Policy", href: "/insights" },
      { label: "Contact", href: "/insights" },
    ],
  },
];
