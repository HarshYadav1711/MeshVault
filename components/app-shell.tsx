import Link from "next/link";

type AppShellProps = {
  userName: string;
  children: React.ReactNode;
};

export default function AppShell({ userName, children }: AppShellProps) {
  return (
    <div>
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Signed in as</p>
            <p className="text-sm font-medium text-slate-900">{userName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Dashboard
            </Link>
            <Link
              href="/requests/new"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              New Request
            </Link>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
