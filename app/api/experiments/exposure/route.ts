import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      experimentId?: string;
      variant?: string;
      sessionKey?: string;
    };

    if (!body.experimentId || !body.variant || !body.sessionKey) {
      return NextResponse.json({ error: "experimentId, variant and sessionKey are required." }, { status: 400 });
    }

    console.info("experiment_exposure", {
      experimentId: body.experimentId,
      variant: body.variant,
      sessionKey: body.sessionKey,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to log experiment exposure." }, { status: 500 });
  }
}
