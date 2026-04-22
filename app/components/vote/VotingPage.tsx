"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppFooter } from "../shared/AppFooter";
import { AppNav } from "../shared/AppNav";
import { TrendingLeadersVoteGrid } from "./sections/TrendingLeadersVoteGrid";
import { VoteActionsPanel } from "./sections/VoteActionsPanel";
import { VoteBreadcrumb } from "./sections/VoteBreadcrumb";
import { VoteHeroCard } from "./sections/VoteHeroCard";
import { VoteTrustMeta } from "./sections/VoteTrustMeta";
import type { VotePageData } from "./types";

const initialVoteData: VotePageData = {
  featuredLeader: {
    id: "",
    name: "",
    role: "",
    party: "",
    popularity: 0,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Loading",
  },
  voteWindow: {
    title: "100% Anonymous",
    description: "Your identity is never stored with your vote.",
    availabilityLabel: "Checking availability...",
  },
  trendingLeaders: [],
};

export function VotingPage() {
  const searchParams = useSearchParams();
  const leaderId = searchParams.get("leader") ?? "";
  const [votePageData, setVotePageData] = useState<VotePageData>(initialVoteData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (leaderId) {
        params.set("leader", leaderId);
      }

      try {
        const response = await fetch(`/api/vote/context?${params.toString()}`);
        const data = (await response.json()) as VotePageData & { error?: string };
        if (!response.ok) {
          throw new Error(data.error || "Could not load vote data.");
        }
        if (!isCurrentRequest) return;
        setVotePageData(data);
      } catch (requestError) {
        if (!isCurrentRequest) return;
        setError(requestError instanceof Error ? requestError.message : "Could not load vote data.");
      } finally {
        if (!isCurrentRequest) return;
        setIsLoading(false);
      }
    };

    run();
    return () => {
      isCurrentRequest = false;
    };
  }, [leaderId, refreshKey]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <main className="flex-1 pb-20 pt-24">
        <VoteBreadcrumb />
        <VoteHeroCard leader={votePageData.featuredLeader} isLoading={isLoading} />
        <section className="mx-auto mt-6 max-w-4xl px-6">
          <div className="glass-card rounded-[40px] p-8 md:p-12">
            <VoteActionsPanel leaderId={votePageData.featuredLeader.id} isLoading={isLoading} />
            <VoteTrustMeta voteWindow={votePageData.voteWindow} />
          </div>
        </section>
        {error ? (
          <section className="mx-auto mt-10 max-w-4xl px-6">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
              <p className="text-sm font-medium text-rose-600">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setRefreshKey((prev) => prev + 1);
                }}
                className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Retry
              </button>
            </div>
          </section>
        ) : null}
        <TrendingLeadersVoteGrid leaders={votePageData.trendingLeaders} isLoading={isLoading} />
      </main>
      <AppFooter />
    </div>
  );
}
