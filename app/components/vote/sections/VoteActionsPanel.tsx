"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  buildCookieString,
  ensureExperimentSessionKey,
  EXPERIMENTS,
  experimentSessionCookieName,
  getExperimentCookieName,
  getExperimentVariant,
  logExperimentExposure,
  readCookieValue,
} from "@/lib/experiments";

type VoteActionsPanelProps = {
  leaderId: string;
  isLoading?: boolean;
};

export function VoteActionsPanel({ leaderId, isLoading = false }: VoteActionsPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const experimentAssignment = useMemo(() => {
    const experiment = EXPERIMENTS.voteCtaCopyV1;
    const cookies = typeof document === "undefined" ? "" : document.cookie;
    const existingVariant = readCookieValue(cookies, getExperimentCookieName(experiment.id));
    const session = ensureExperimentSessionKey(cookies);
    const variant =
      existingVariant && experiment.variants.includes(existingVariant)
        ? existingVariant
        : getExperimentVariant(experiment, session.key);

    return {
      experiment,
      variant,
      session,
      hasExistingVariant: Boolean(existingVariant && experiment.variants.includes(existingVariant)),
    };
  }, []);

  const variant = experimentAssignment.variant;

  useEffect(() => {
    if (experimentAssignment.session.shouldPersist) {
      document.cookie = buildCookieString(
        experimentSessionCookieName,
        experimentAssignment.session.key,
        60 * 60 * 24 * 30,
      );
    }
    if (!experimentAssignment.hasExistingVariant) {
      document.cookie = buildCookieString(
        getExperimentCookieName(experimentAssignment.experiment.id),
        experimentAssignment.variant,
        60 * 60 * 24 * 30,
      );
    }
    void logExperimentExposure({
      experimentId: experimentAssignment.experiment.id,
      variant: experimentAssignment.variant,
      sessionKey: experimentAssignment.session.key,
    });
  }, [experimentAssignment]);

  const ctaContent = useMemo(() => {
    if (variant === "compact_copy") {
      return {
        approveTitle: isSubmitting === "approve" ? "Saving..." : "Support",
        approveDescription: "Back this leader's direction.",
        rejectTitle: isSubmitting === "reject" ? "Saving..." : "Not Support",
        rejectDescription: "Signal dissatisfaction with performance.",
      };
    }
    return {
      approveTitle: isSubmitting === "approve" ? "Submitting..." : "Approve",
      approveDescription: "I support the current leadership and policies.",
      rejectTitle: isSubmitting === "reject" ? "Submitting..." : "Disapprove",
      rejectDescription: "I am unhappy with the current performance.",
    };
  }, [isSubmitting, variant]);

  async function submitVote(choice: "approve" | "reject") {
    if (!leaderId || isSubmitting) return;

    setError(null);
    setIsSubmitting(choice);

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ leaderId, choice }),
      });
      const data = (await response.json()) as { error?: string };
      if (response.status === 401) {
        setShowLoginPrompt(true);
        return;
      }
      if (!response.ok) {
        setError(data.error ?? "Failed to submit vote.");
        return;
      }

      const confirmationChoice = choice === "approve" ? "approve" : "disapprove";
      router.push(`/vote/confirmation?leader=${leaderId}&choice=${confirmationChoice}`);
    } catch {
      setError("Failed to submit vote.");
    } finally {
      setIsSubmitting(null);
    }
  }

  const redirectUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  if (isLoading) {
    return (
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <button
          type="button"
          onClick={() => submitVote("approve")}
          disabled={isSubmitting !== null}
        className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-teal-600 p-8 text-white shadow-xl shadow-teal-600/20 transition-all hover:scale-[1.02] hover:bg-teal-700 active:scale-95"
        >
          <span className="text-5xl transition-transform group-hover:rotate-12">👍</span>
          <span className="text-2xl font-bold">{ctaContent.approveTitle}</span>
          <p className="text-center text-sm text-teal-50 opacity-80">
            {ctaContent.approveDescription}
          </p>
        </button>

        <button
          type="button"
          onClick={() => submitVote("reject")}
          disabled={isSubmitting !== null}
        className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 text-slate-900 shadow-sm transition-all hover:scale-[1.02] hover:border-orange-500 hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/10 active:scale-95"
        >
          <span className="text-5xl text-orange-600 transition-transform group-hover:-rotate-12">
            👎
          </span>
          <span className="text-2xl font-bold">{ctaContent.rejectTitle}</span>
          <p className="text-center text-sm text-slate-500">
            {ctaContent.rejectDescription}
          </p>
        </button>
      </div>

      {error ? (
        <p className="-mt-8 mb-8 text-sm font-medium text-rose-600">{error}</p>
      ) : null}

      {showLoginPrompt ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">
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
