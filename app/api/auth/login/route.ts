import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    { error: "Email/password login is disabled. Please continue with Google." },
    { status: 400 },
  );
}
