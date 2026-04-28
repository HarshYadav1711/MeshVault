import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "List requests handler scaffolded. Backend logic not implemented yet." },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Create request handler scaffolded. Backend logic not implemented yet." },
    { status: 501 },
  );
}
