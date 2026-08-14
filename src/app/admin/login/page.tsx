"use client";

import { useState } from "react";
import { Container } from "@/components/container";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed");
      setSubmitting(false);
      return;
    }

    // Use a full page navigation (not router.push) so the browser makes a
    // fresh request to /admin with the new cookie attached. This also
    // avoids a client-side router transition hang some Next.js versions hit
    // right after an auth cookie changes underneath the current route.
    window.location.href = "/admin";
  }

  return (
    <section className="flex min-h-[100dvh] items-center bg-void">
      <Container>
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-2xl text-ink">Staff login</h1>
          <p className="mt-2 text-sm text-ink-faint">
            Job requests dashboard — staff only.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-ink-muted">
                Password
              </span>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent-green"
              />
            </label>
            {error && (
              <p className="border-l-2 border-red-500 pl-4 text-sm text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary-on-dark w-full justify-center disabled:opacity-50"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
