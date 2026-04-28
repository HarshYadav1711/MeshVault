type RequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Request ID</p>
        <p className="mt-1 text-sm text-slate-700">{id}</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Request detail scaffold</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This route is reserved for request-specific view and edit flows once backend handlers are
          connected.
        </p>
      </section>
    </main>
  );
}
