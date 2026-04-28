import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
        <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          Internal Operations Platform
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Request, review, and track 3D production work in one reliable workspace.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          MeshVault brings order to asset intake by giving teams a clear queue, structured request
          details, and dependable ownership handoff.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/signup" className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
            Start with MeshVault
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700"
          >
            Open workspace
          </Link>
        </div>
      </section>

      <section id="features" className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-8 sm:grid-cols-3">
        {[
          ["Structured Intake", "Capture complete request context so artists start with clarity."],
          ["Status Visibility", "Keep request progress visible across teams and stakeholders."],
          ["Operational Focus", "Built for calm daily execution, not noisy project management."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <section id="workflow" className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Simple workflow</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Submit a request, enrich requirements, and move it through clear status checkpoints:
            Pending, In Progress, and Completed.
          </p>
        </div>
      </section>

      <section id="security" className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">Security-first architecture</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            The project is structured for secure authentication, user-scoped data, and production
            deployment on free-tier infrastructure.
          </p>
        </div>
      </section>
    </div>
  );
}
