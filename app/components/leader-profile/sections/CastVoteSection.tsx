"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type CastVoteSectionProps = {
  leaderId: string;
};

export function CastVoteSection({ leaderId }: CastVoteSectionProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitVote = async (choice: "approve" | "reject") => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leaderId, choice }),
      });
      if (!response.ok) {
        router.push(`/vote?leader=${leaderId}`);
        return;
      }
      const choiceParam = choice === "approve" ? "approve" : "disapprove";
      router.push(`/vote/confirmation?leader=${leaderId}&choice=${choiceParam}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cast-vote" className="glass-card rounded-[32px] border-2 border-teal-100 p-8">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">Cast Your Vote</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitVote("approve")}
          className="rounded-2xl bg-teal-600 p-4 font-bold text-white transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => router.push(`/vote?leader=${leaderId}`)}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 transition-all hover:bg-slate-50"
        >
          Neutral
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitVote("reject")}
          className="rounded-2xl border border-orange-200 bg-orange-50 p-4 font-bold text-orange-700 transition-all hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Disapprove
        </button>
      </div>
      <p className="mb-6 text-sm font-medium text-slate-500">
        Approve and disapprove votes submit immediately. Neutral opens the full voting flow.
      </p>
      <Link
        href={`/vote?leader=${leaderId}`}
        className="block rounded-[24px] bg-teal-600 py-4 text-center font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700"
      >
        Continue to Vote Flow
      </Link>
    </section>
  );
}
