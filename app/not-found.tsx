import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-4 py-12">
      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you are looking for does not exist or is no longer available.
        </p>
        <Link href="/" className="mt-5 inline-block text-sm font-medium text-slate-900 underline">
          Return to home
        </Link>
      </div>
    </main>
  );
}
