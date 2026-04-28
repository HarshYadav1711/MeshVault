"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  mode: "signup" | "login";
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Request failed");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        {mode === "signup" ? "Create account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {mode === "signup"
          ? "Set up your MeshVault workspace access."
          : "Sign in to access your request dashboard."}
      </p>

      <div className="mt-6 space-y-4">
        {mode === "signup" ? (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {isSubmitting ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
      </button>

      <p className="mt-4 text-sm text-slate-600">
        {mode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={mode === "signup" ? "/login" : "/signup"} className="font-medium text-slate-900 underline">
          {mode === "signup" ? "Login" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
