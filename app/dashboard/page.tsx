import Link from "next/link";
import { redirect } from "next/navigation";

import AppShell from "@/components/app-shell";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import AssetRequest from "@/models/AssetRequest";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  await connectToDatabase();
  const requests = await AssetRequest.find({ userId: user.id })
    .sort({ updatedAt: -1 })
    .select("_id title status updatedAt")
    .lean();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <AppShell userName={user.name}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Asset Requests</h1>
            <p className="mt-1 text-sm text-slate-600">
              View and manage your request queue.
            </p>
          </div>
          <Link href="/requests/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Create Request
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-lg font-medium text-slate-900">No requests yet</h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your first asset request to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={String(request._id)} className="border-t border-slate-200">
                    <td className="px-4 py-3">
                      <Link href={`/requests/${request._id}`} className="font-medium text-slate-900 underline">
                        {request.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">
                      {String(request.status).replace("_", " ")}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {new Date(request.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AppShell>
    </main>
  );
}
