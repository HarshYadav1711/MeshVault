import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { apiError, firstZodError } from "@/lib/http";
import { normalizeRequestStatus } from "@/lib/request-status";
import { assetRequestSchema } from "@/lib/validation";
import AssetRequest from "@/models/AssetRequest";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return apiError("Unauthorized", 401);
  }

  await connectToDatabase();
  const requests = await AssetRequest.find({ userId: user.id }).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return apiError("Unauthorized", 401);
  }

  try {
    const body = await request.json();
    const parsed = assetRequestSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(firstZodError(parsed.error), 400);
    }

    await connectToDatabase();
    const created = await AssetRequest.create({
      userId: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      referenceImageUrl: parsed.data.referenceImageUrl ?? "",
      status: normalizeRequestStatus(parsed.data.status ?? "pending"),
    });

    return NextResponse.json({ request: created }, { status: 201 });
  } catch {
    return apiError("Unable to create request", 500);
  }
}
