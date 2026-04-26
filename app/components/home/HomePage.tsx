import { fallbackHomePageData, type HomePageData } from "@/lib/home-page-data";
import { BottomCtaSection } from "./sections/BottomCtaSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { RegionSelectorSection } from "./sections/RegionSelectorSection";
import { SiteFooter } from "./sections/SiteFooter";
import { StatsSection } from "./sections/StatsSection";
import { TrendingLeadersSection } from "./sections/TrendingLeadersSection";
import { AppNav } from "../shared/AppNav";

type HomePageProps = {
  data?: HomePageData;
};

export function HomePage({ data = fallbackHomePageData }: HomePageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="home" />
      <main className="pt-20">
        <HeroSection />
        <TrendingLeadersSection leaders={data.leaders} />
        <RegionSelectorSection states={data.stateChips} />
        <StatsSection stats={data.stats} />
        <HowItWorksSection steps={data.howItWorksSteps} />
        <BottomCtaSection />
      </main>
      <SiteFooter groups={data.footerGroups} />
    </div>
  );
}
