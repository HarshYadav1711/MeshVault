import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard foundation</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          This page is scaffolded for authenticated user dashboards. Backend access checks and live
          request data are intentionally not implemented yet.
        </p>
        <div className="mt-6">
          <Link href="/requests/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Open request form scaffold
          </Link>
        </div>
      </div>
    </main>
  );
}
