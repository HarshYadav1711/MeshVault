import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { apiError, firstZodError } from "@/lib/http";
import { normalizeRequestStatus } from "@/lib/request-status";
import { assetRequestSchema } from "@/lib/validation";
import AssetRequest from "@/models/AssetRequest";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return apiError("Unauthorized", 401);
  }

  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) {
    return apiError("Invalid request id", 400);
  }

  try {
    const body = await request.json();
    const parsed = assetRequestSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(firstZodError(parsed.error), 400);
    }

    await connectToDatabase();
    const updated = await AssetRequest.findOneAndUpdate(
      { _id: id, userId: user.id },
      {
        title: parsed.data.title,
        description: parsed.data.description,
        referenceImageUrl: parsed.data.referenceImageUrl ?? "",
        status: normalizeRequestStatus(parsed.data.status ?? "pending"),
      },
      { new: true },
    );

    if (!updated) {
      return apiError("Request not found", 404);
    }

    return NextResponse.json({ request: updated });
  } catch {
    return apiError("Unable to update request", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return apiError("Unauthorized", 401);
  }

  const { id } = await context.params;
  if (!Types.ObjectId.isValid(id)) {
    return apiError("Invalid request id", 400);
  }

  await connectToDatabase();
  const deleted = await AssetRequest.findOneAndDelete({ _id: id, userId: user.id });
  if (!deleted) {
    return apiError("Request not found", 404);
  }

  return NextResponse.json({ ok: true });
}
