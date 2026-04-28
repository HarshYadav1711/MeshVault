import { redirect } from "next/navigation";

import AppShell from "@/components/app-shell";
import RequestForm from "@/components/request-form";
import { getCurrentUser } from "@/lib/auth";

export default async function NewRequestPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <AppShell userName={user.name}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900">Create Request</h1>
        <p className="mb-5 text-sm text-slate-600">
          Add complete request details so production can start quickly.
        </p>
        <RequestForm mode="create" />
      </AppShell>
    </main>
  );
}
