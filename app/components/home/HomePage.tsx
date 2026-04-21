import { leaders, stateChips, stats, howItWorksSteps, footerGroups } from "./homeData";
import { BottomCtaSection } from "./sections/BottomCtaSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { RegionSelectorSection } from "./sections/RegionSelectorSection";
import { SiteFooter } from "./sections/SiteFooter";
import { StatsSection } from "./sections/StatsSection";
import { TrendingLeadersSection } from "./sections/TrendingLeadersSection";
import { AppNav } from "../shared/AppNav";

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="home" />
      <main className="pt-20">
        <HeroSection />
        <TrendingLeadersSection leaders={leaders} />
        <RegionSelectorSection states={stateChips} />
        <StatsSection stats={stats} />
        <HowItWorksSection steps={howItWorksSteps} />
        <BottomCtaSection />
      </main>
      <SiteFooter groups={footerGroups} />
    </div>
  );
}
