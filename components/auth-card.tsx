import Link from "next/link";

type AuthCardProps = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export default function AuthCard({
  title,
  description,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: AuthCardProps) {
  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            disabled
            placeholder="you@company.com"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            disabled
            placeholder="••••••••"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
        </div>
        <button
          type="button"
          disabled
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white opacity-60"
        >
          {primaryLabel}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        This screen is scaffolded. Backend logic is intentionally not wired yet.
      </p>
      <Link href={secondaryHref} className="mt-2 inline-block text-sm font-medium text-slate-900 underline">
        {secondaryLabel}
      </Link>
    </section>
  );
}
