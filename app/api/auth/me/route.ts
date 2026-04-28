import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Current user handler scaffolded. Backend logic not implemented yet." },
    { status: 501 },
  );
}
