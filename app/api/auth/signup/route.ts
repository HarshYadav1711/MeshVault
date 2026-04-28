import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import { apiError, firstZodError } from "@/lib/http";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { signupSchema } from "@/lib/validation";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(firstZodError(parsed.error), 400);
    }

    await connectToDatabase();
    const email = parsed.data.email.toLowerCase();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return apiError("An account with this email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await User.create({
      name: parsed.data.name,
      email,
      passwordHash,
    });

    const token = await createSessionToken({
      sub: String(user._id),
      name: user.name,
      email: user.email,
    });
    await setSessionCookie(token);

    return NextResponse.json(
      {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch {
    return apiError("Unable to create account", 500);
  }
}
