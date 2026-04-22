"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { TrendingVoteLeader } from "./types";

type VoteLeaderCardProps = {
  leader: TrendingVoteLeader;
};

export function VoteLeaderCard({ leader }: VoteLeaderCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState<"approve" | "reject" | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  async function submitVote(choice: "approve" | "reject") {
    if (isSubmitting) return;
    setIsSubmitting(choice);
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ leaderId: leader.id, choice }),
      });
      if (response.status === 401) {
        setShowLoginPrompt(true);
        return;
      }
      if (!response.ok) {
        return;
      }
      router.push(
        `/vote/confirmation?leader=${leader.id}&choice=${choice === "approve" ? "approve" : "disapprove"}`,
      );
    } finally {
      setIsSubmitting(null);
    }
  }

  const redirectUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <>
      <article className="glass-card group rounded-3xl p-5 transition-all hover:border-teal-400/60 hover:shadow-lg">
        <Link
          href="/compare"
          className="mb-4 flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-slate-100 transition-all group-hover:ring-teal-200">
            <Image
              src={leader.avatarUrl}
              alt={leader.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="truncate text-lg font-bold text-slate-900">{leader.name}</h3>
            <p className="truncate text-xs font-medium text-slate-500">
              {leader.role} | {leader.party}
            </p>
          </div>
        </Link>

        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-bold text-slate-500">Score</span>
            <span className="font-bold text-teal-600">{leader.popularity}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${leader.popularity}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isSubmitting !== null}
            onClick={() => submitVote("approve")}
            className="flex items-center justify-center rounded-xl bg-teal-50 py-2 text-xs font-bold text-teal-600 transition-all hover:bg-teal-600 hover:text-white disabled:opacity-60"
          >
            {isSubmitting === "approve" ? "..." : "Approve"}
          </button>
          <button
            type="button"
            disabled={isSubmitting !== null}
            onClick={() => submitVote("reject")}
            className="flex items-center justify-center rounded-xl bg-slate-50 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-orange-500 hover:text-white disabled:opacity-60"
          >
            {isSubmitting === "reject" ? "..." : "Reject"}
          </button>
        </div>
      </article>

      {showLoginPrompt ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Login Required</h3>
            <p className="mt-2 text-sm text-slate-600">
              For vote you have to login to the account.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
