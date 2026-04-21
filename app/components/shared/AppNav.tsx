import Link from "next/link";
import { BarChart3 } from "lucide-react";

type AppNavProps = {
  activeLink?: "nav-explore" | "nav-stats" | "nav-regions" | "nav-about";
  exploreHref?: string;
  insightsHref?: string;
  regionsHref?: string;
  howItWorksHref?: string;
  onLogin?: () => void;
  onGetStarted?: () => void;
  active?: "home" | "regions" | "compare" | "insights" | "dashboard";
};

const activeLinkByLegacyKey: Record<
  NonNullable<AppNavProps["active"]>,
  NonNullable<AppNavProps["activeLink"]>
> = {
  home: "nav-explore",
  regions: "nav-regions",
  compare: "nav-explore",
  insights: "nav-stats",
  dashboard: "nav-explore",
};

export function AppNav({
  activeLink,
  exploreHref = "/",
  insightsHref = "/insights",
  regionsHref = "/regions",
  howItWorksHref = "/#how-it-works",
  onLogin,
  onGetStarted,
  active,
}: AppNavProps) {
  const resolvedActiveLink =
    activeLink ?? (active ? activeLinkByLegacyKey[active] : "nav-explore");

  const linkClass = (key: NonNullable<AppNavProps["activeLink"]>) =>
    key === resolvedActiveLink
      ? "text-teal-600 font-bold"
      : "text-slate-600 transition-colors hover:text-teal-600";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900">
            Jan<span className="text-teal-600">Mat</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href={exploreHref} className={linkClass("nav-explore")}>
            Explore Leaders
          </Link>
          <Link href={insightsHref} className={linkClass("nav-stats")}>
            Insights
          </Link>
          <Link href={howItWorksHref} className={linkClass("nav-about")}>
            How It Works
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            onClick={onLogin}
            className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
