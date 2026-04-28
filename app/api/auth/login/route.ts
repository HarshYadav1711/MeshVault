import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import { apiError, firstZodError } from "@/lib/http";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { loginSchema } from "@/lib/validation";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(firstZodError(parsed.error), 400);
    }

    await connectToDatabase();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    const validPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!validPassword) {
      return apiError("Invalid email or password", 401);
    }

    const token = await createSessionToken({
      sub: String(user._id),
      name: user.name,
      email: user.email,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    return apiError("Unable to sign in", 500);
  }
}
