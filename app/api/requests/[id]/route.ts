import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    { message: "Update request handler scaffolded. Backend logic not implemented yet." },
    { status: 501 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Delete request handler scaffolded. Backend logic not implemented yet." },
    { status: 501 },
  );
}
