import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function firstZodError(error: ZodError) {
  return error.issues[0]?.message ?? "Invalid request payload";
}
