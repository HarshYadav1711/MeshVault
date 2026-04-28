export default function NewRequestPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create request</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          UI scaffold for request creation. API integration and data persistence will be added in the
          backend implementation phase.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
            <input
              disabled
              placeholder="High-poly sci-fi crate model"
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              disabled
              rows={5}
              placeholder="Define constraints, deadline, references, and expected output."
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
          </div>
          <button
            type="button"
            disabled
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white opacity-60"
          >
            Submit request
          </button>
        </form>
      </section>
    </main>
  );
}
