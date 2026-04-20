"use client";

import { useMemo, useState } from "react";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import {
  dashboardUserProfile,
  favoriteLeaders,
  recommendationLeaders,
  recentVotes,
  settingsToggles,
  streakDays,
} from "./dashboardData";
import { FavoritesPanel } from "./sections/FavoritesPanel";
import { QuickActionsPanel } from "./sections/QuickActionsPanel";
import { RecentVotesPanel } from "./sections/RecentVotesPanel";
import { RecommendationsPanel } from "./sections/RecommendationsPanel";
import { SettingsPanel } from "./sections/SettingsPanel";
import { StreakTrackerPanel } from "./sections/StreakTrackerPanel";
import { UserProfileHero } from "./sections/UserProfileHero";

export function DashboardPage() {
  const [localToggles, setLocalToggles] = useState(settingsToggles);
  const [votesByLeader, setVotesByLeader] = useState<
    Record<string, "approve" | "reject" | undefined>
  >({});

  const interactiveStreakDays = useMemo(() => {
    const lastActiveDay = streakDays.reduce(
      (acc, day) => (day.active ? day.day : acc),
      0,
    );
    return streakDays.map((day) => ({
      ...day,
      isToday: day.day === lastActiveDay,
    }));
  }, []);

  const handleToggle = (toggleId: string) => {
    setLocalToggles((current) =>
      current.map((toggle) =>
        toggle.id === toggleId ? { ...toggle, enabled: !toggle.enabled } : toggle,
      ),
    );
  };

  const handleRecommendationVote = (
    leaderId: string,
    vote: "approve" | "reject",
  ) => {
    setVotesByLeader((current) => ({ ...current, [leaderId]: vote }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="dashboard" />
      <main className="flex-1 px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <UserProfileHero user={dashboardUserProfile} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <RecommendationsPanel
                leaders={recommendationLeaders}
                votesByLeader={votesByLeader}
                onVote={handleRecommendationVote}
              />
              <FavoritesPanel leaders={favoriteLeaders} />
              <RecentVotesPanel votes={recentVotes} />
            </div>

            <div className="space-y-8 lg:col-span-4">
              <StreakTrackerPanel
                streakDaysCount={dashboardUserProfile.streakDays}
                days={interactiveStreakDays}
              />
              <QuickActionsPanel />
              <SettingsPanel toggles={localToggles} onToggle={handleToggle} />
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
