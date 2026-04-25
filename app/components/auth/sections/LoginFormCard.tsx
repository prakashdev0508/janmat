"use client";

import { Vote } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { loginLegalLinks, socialProviders } from "../loginData";

export function LoginFormCard() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const redirectTo = searchParams.get("redirect") || "/regions";
      const supabase = createClient();
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", redirectTo);

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (signInError) {
        setError(signInError.message || "Google login failed.");
      }
    } catch {
      setError("Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
      <div className="mb-8 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488] text-white">
            <Vote className="h-5 w-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#1e293b]">JanMat</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-4xl border border-[#e2e8f0] bg-white p-8 shadow-xl sm:p-12">
          <header className="mb-10 text-center lg:text-left">
            <h2 className="mb-2 text-3xl font-bold text-[#1e293b]">Login to JanMat</h2>
            <p className="text-[#64748b]">Continue with your Google account to start voting.</p>
          </header>

          <div className="grid grid-cols-1 gap-4">
            {socialProviders.map((provider) => (
              <button
                key={provider.id}
                type="button"
                disabled={isSubmitting}
                onClick={handleGoogleLogin}
                className="flex h-12 items-center justify-center rounded-xl border border-[#e2e8f0] transition-all hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {provider.id === "google" ? (
                  <span className="mr-2 text-lg" aria-hidden="true">
                    G
                  </span>
                ) : (
                  <span className="mr-2 text-lg" aria-hidden="true">
                    G
                  </span>
                )}
                <span className="text-sm font-bold text-[#334155]">
                  {isSubmitting ? "Redirecting to Google..." : provider.label}
                </span>
              </button>
            ))}
          </div>

          {error ? (
            <p className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </p>
          ) : null}

          <footer className="mt-12 flex items-center justify-center gap-4 text-xs font-semibold text-[#94a3b8]">
            {loginLegalLinks.map((item, index) => (
              <div key={item.label} className="flex items-center gap-4">
                <Link href={item.href} className="transition-colors hover:text-[#0d9488]">
                  {item.label}
                </Link>
                {index < loginLegalLinks.length - 1 ? (
                  <span className="h-1 w-1 rounded-full bg-[#e2e8f0]" />
                ) : null}
              </div>
            ))}
          </footer>
        </div>
      </div>
    </section>
  );
}
