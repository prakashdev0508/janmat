"use client";

import { Code2, Lock, Mail, Eye, EyeOff, Vote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { loginLegalLinks, socialProviders } from "../loginData";

export function LoginFormCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push("/admin/user");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
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
            <p className="text-[#64748b]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-[#0d9488] transition-all hover:underline">
                Sign up
              </Link>
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-[#334155]">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-4 w-4 text-[#94a3b8]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input-focus-teal h-12 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pr-4 pl-12 font-medium text-[#1e293b] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-bold text-[#334155]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#0d9488] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-4 w-4 text-[#94a3b8]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-focus-teal h-12 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pr-12 pl-12 font-medium text-[#1e293b] transition-all"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#94a3b8] transition-colors hover:text-[#0d9488]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <label className="flex items-start gap-3 text-sm text-[#64748b]">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-[#e2e8f0] text-[#0d9488] focus:ring-[#0d9488]"
                />
                <span>Remember me for 30 days</span>
              </label>

              <label className="flex items-start gap-3 text-xs leading-relaxed text-[#64748b]">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#e2e8f0] text-[#0d9488] focus:ring-[#0d9488]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="font-medium text-[#0d9488] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-[#0d9488] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d9488] text-lg font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-[#065f46] active:scale-[0.98]"
            >
              {isSubmitting ? "Logging in..." : "Login to Account"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 font-bold tracking-widest text-[#94a3b8]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {socialProviders.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="flex h-12 items-center justify-center rounded-xl border border-[#e2e8f0] transition-all hover:bg-[#f8fafc]"
              >
                {provider.id === "google" ? (
                  <span className="mr-2 text-lg" aria-hidden="true">
                    G
                  </span>
                ) : (
                  <Code2 className="mr-2 h-4 w-4 text-[#1e293b]" />
                )}
                <span className="text-sm font-bold text-[#334155]">{provider.label}</span>
              </button>
            ))}
          </div>

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
