"use client";

import Link from "next/link";
import { BarChart3, Send } from "lucide-react";

type AppFooterProps = {
  twitterHref?: string;
  linkedinHref?: string;
  instagramHref?: string;
  exploreHref?: string;
  votingHref?: string;
  verifyHref?: string;
  apiHref?: string;
  aboutHref?: string;
  methodHref?: string;
  privacyHref?: string;
  contactHref?: string;
  termsHref?: string;
  cookiesHref?: string;
  onSubscribe?: (email: string) => void;
};

export function AppFooter({
  twitterHref = "https://x.com",
  linkedinHref = "https://www.linkedin.com",
  instagramHref = "https://www.instagram.com",
  exploreHref = "/regions",
  votingHref = "/vote",
  verifyHref = "/dashboard",
  apiHref = "/insights",
  aboutHref = "/insights",
  methodHref = "/insights",
  privacyHref = "/insights",
  contactHref = "/insights",
  termsHref = "/insights",
  cookiesHref = "/insights",
  onSubscribe,
}: AppFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 shadow-md">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">
                Jan<span className="text-teal-600">Mat</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed font-medium text-slate-500">
              India&apos;s first real-time, citizen-led political sentiment platform.
              We visualize public opinion to foster transparency and engagement.
            </p>
            <div className="flex gap-4 text-slate-400">
              <Link href={twitterHref} className="text-xl transition-colors hover:text-teal-600">
                X
              </Link>
              <Link
                href={linkedinHref}
                className="text-xl transition-colors hover:text-teal-600"
              >
                in
              </Link>
              <Link
                href={instagramHref}
                className="text-xl transition-colors hover:text-teal-600"
              >
                ig
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-slate-900">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500">
              <li>
                <Link href={exploreHref} className="transition-colors hover:text-teal-600">
                  Explore Trends
                </Link>
              </li>
              <li>
                <Link href={votingHref} className="transition-colors hover:text-teal-600">
                  Voting Rules
                </Link>
              </li>
              <li>
                <Link href={verifyHref} className="transition-colors hover:text-teal-600">
                  Identity Verification
                </Link>
              </li>
              <li>
                <Link href={apiHref} className="transition-colors hover:text-teal-600">
                  Public API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-slate-900">Company</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500">
              <li>
                <Link href={aboutHref} className="transition-colors hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={methodHref} className="transition-colors hover:text-teal-600">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href={privacyHref} className="transition-colors hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={contactHref} className="transition-colors hover:text-teal-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-slate-900">Newsletter</h4>
            <p className="mb-4 text-sm font-medium text-slate-500">
              Get weekly insights on political sentiment shifts.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const email = String(formData.get("email") ?? "");
                if (onSubscribe) {
                  onSubscribe(email);
                  return;
                }
                fetch("/api/newsletter", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email }),
                }).catch(() => {
                  // Intentionally no-op in footer fallback mode.
                });
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-4 py-2 text-white shadow-md transition-all hover:bg-teal-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs font-bold tracking-wider text-slate-400 uppercase md:flex-row">
          <p>© 2024 JanMat Platforms. Independent &amp; Non-Official.</p>
          <div className="flex gap-6">
            <Link href={termsHref} className="transition-colors hover:text-slate-900">
              Terms of Service
            </Link>
            <Link href={cookiesHref} className="transition-colors hover:text-slate-900">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
