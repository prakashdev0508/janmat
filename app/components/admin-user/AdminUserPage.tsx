"use client";

import { FormEvent, useState } from "react";
import { AppNav } from "@/app/components/shared/AppNav";

type CreateUserResponse = {
  success?: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    createdAt: string;
  };
};

export function AdminUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CreateUserResponse | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as CreateUserResponse;
      setResult(data);
      if (response.ok) {
        setEmail("");
        setPassword("");
      }
    } catch {
      setResult({ error: "Could not create user right now." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="home" />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin User Management</h1>
          <p className="mt-2 text-sm text-slate-600">
            Create new users with encrypted passwords.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="admin-user-email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="admin-user-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="admin-user-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="admin-user-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700"
                placeholder="Minimum 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </form>

          {result ? (
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
              {result.error ? (
                <p className="text-rose-600">{result.error}</p>
              ) : (
                <p className="text-emerald-700">
                  User created successfully: <span className="font-semibold">{result.user?.email}</span>
                </p>
              )}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
