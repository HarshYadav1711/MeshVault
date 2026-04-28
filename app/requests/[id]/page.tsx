import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";

import AppShell from "@/components/app-shell";
import RequestForm from "@/components/request-form";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import AssetRequest from "@/models/AssetRequest";

type RequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RequestDetailPage({ params }: RequestDetailPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (!Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectToDatabase();
  const request = await AssetRequest.findOne({ _id: id, userId: user.id }).lean();
  if (!request) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <AppShell userName={user.name}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-900">Edit Request</h1>
        <p className="mb-5 text-sm text-slate-600">Update details and status for this asset request.</p>
        <RequestForm
          mode="edit"
          request={{
            id: String(request._id),
            title: request.title,
            description: request.description,
            referenceImageUrl: request.referenceImageUrl ?? "",
            status: request.status,
          }}
        />
      </AppShell>
    </main>
  );
}
