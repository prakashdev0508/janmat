import { NextResponse } from "next/server";
import { jsonWithCache } from "@/lib/api-cache";
import { getComparePageData } from "@/lib/compare-page-data";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leaderOne = searchParams.get("leaderOne") ?? undefined;
    const leaderTwo = searchParams.get("leaderTwo") ?? undefined;
    const data = await getComparePageData(leaderOne, leaderTwo);
    return jsonWithCache(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
