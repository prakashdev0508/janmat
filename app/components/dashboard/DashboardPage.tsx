"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { fallbackDashboardData } from "./dashboardData";
import { FavoritesPanel } from "./sections/FavoritesPanel";
import { QuickActionsPanel } from "./sections/QuickActionsPanel";
import { RecentVotesPanel } from "./sections/RecentVotesPanel";
import { RecommendationsPanel } from "./sections/RecommendationsPanel";
import { SettingsPanel } from "./sections/SettingsPanel";
import { StreakTrackerPanel } from "./sections/StreakTrackerPanel";
import { UserProfileHero } from "./sections/UserProfileHero";
import type { DashboardData } from "./types";

export function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(fallbackDashboardData);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [requiresLoginOverlay, setRequiresLoginOverlay] = useState(false);
  const [localToggles, setLocalToggles] = useState(
    fallbackDashboardData.settingsToggles,
  );
  const [votesByLeader, setVotesByLeader] = useState<
    Record<string, "approve" | "reject" | undefined>
  >({});

  useEffect(() => {
    let isMounted = true;

    fetch("/api/dashboard")
      .then(async (response) => {
        if (response.status === 401) {
          setRequiresLoginOverlay(true);
          return null;
        }
        if (!response.ok) return null;
        setRequiresLoginOverlay(false);
        return (await response.json()) as DashboardData;
      })
      .then((data) => {
        if (!isMounted || !data) return;
        setDashboardData(data);
        const storedToggles = localStorage.getItem("dashboard-settings-toggles");
        if (storedToggles) {
          try {
            setLocalToggles(JSON.parse(storedToggles));
          } catch {
            setLocalToggles(data.settingsToggles);
          }
        } else {
          setLocalToggles(data.settingsToggles);
        }
      })
      .catch(() => {
        // Keep the static dashboard fallback if auth or network data is unavailable.
      })
      .finally(() => {
        if (!isMounted) return;
        setIsDashboardLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!requiresLoginOverlay) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [requiresLoginOverlay]);

  const interactiveStreakDays = useMemo(() => {
    const lastActiveDay = dashboardData.streakDays.reduce(
      (acc, day) => (day.active ? day.day : acc),
      0,
    );
    return dashboardData.streakDays.map((day) => ({
      ...day,
      isToday: day.day === lastActiveDay,
    }));
  }, [dashboardData.streakDays]);

  const handleToggle = (toggleId: string) => {
    setLocalToggles((current) => {
      const next = current.map((toggle) =>
        toggle.id === toggleId ? { ...toggle, enabled: !toggle.enabled } : toggle,
      );
      localStorage.setItem("dashboard-settings-toggles", JSON.stringify(next));
      return next;
    });
  };

  const handleRecommendationVote = async (
    leaderId: string,
    vote: "approve" | "reject",
  ) => {
    await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leaderId,
        choice: vote,
      }),
    });
    setVotesByLeader((current) => ({ ...current, [leaderId]: vote }));
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  const handleManageSettings = () => {
    document.getElementById("settings-panel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <AppNav active="dashboard" />
      <main className="flex-1 px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          {isDashboardLoading ? (
            <>
              <div className="glass-card h-44 animate-pulse rounded-[32px] bg-slate-200" />
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-8 lg:col-span-8">
                  <div className="glass-card h-72 animate-pulse rounded-[32px] bg-slate-200" />
                  <div className="glass-card h-64 animate-pulse rounded-[32px] bg-slate-200" />
                  <div className="glass-card h-56 animate-pulse rounded-[32px] bg-slate-200" />
                </div>
                <div className="space-y-8 lg:col-span-4">
                  <div className="glass-card h-56 animate-pulse rounded-[32px] bg-slate-200" />
                  <div className="glass-card h-36 animate-pulse rounded-[32px] bg-slate-200" />
                  <div className="glass-card h-72 animate-pulse rounded-[32px] bg-slate-200" />
                </div>
              </div>
            </>
          ) : (
            <>
              <UserProfileHero user={dashboardData.userProfile} />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-8 lg:col-span-8">
                  <RecommendationsPanel
                    leaders={dashboardData.recommendationLeaders}
                    votesByLeader={votesByLeader}
                    onVote={handleRecommendationVote}
                  />
                  <FavoritesPanel leaders={dashboardData.favoriteLeaders} />
                  <RecentVotesPanel votes={dashboardData.recentVotes} />
                </div>

                <div className="space-y-8 lg:col-span-4">
                  <StreakTrackerPanel
                    streakDaysCount={dashboardData.userProfile.streakDays}
                    days={interactiveStreakDays}
                  />
                  <QuickActionsPanel />
                  <div id="settings-panel">
                    <SettingsPanel
                      toggles={localToggles}
                      onToggle={handleToggle}
                      onLogout={handleLogout}
                      onManageSettings={handleManageSettings}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <AppFooter />

      {requiresLoginOverlay ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/55 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Login Required</h2>
            <p className="mt-3 text-sm font-medium text-slate-600">
              To access your dashboard, please login to your account.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  router.push("/login?redirect=%2Fdashboard");
                }}
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
