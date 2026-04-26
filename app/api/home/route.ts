import { NextResponse } from "next/server";
import { jsonWithCache } from "@/lib/api-cache";
import { getCachedHomePageData } from "@/lib/home-page-data";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await getCachedHomePageData();
    return jsonWithCache(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
