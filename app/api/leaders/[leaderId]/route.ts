import { NextResponse } from "next/server";
import { getMemoryCached, jsonWithCache } from "@/lib/api-cache";
import { getLeaderProfileData } from "@/app/components/leader-profile/leaderProfileData";

export const runtime = "nodejs";

type LeaderApiRouteProps = {
  params: Promise<{ leaderId: string }>;
};

export async function GET(_request: Request, { params }: LeaderApiRouteProps) {
  try {
    const { leaderId } = await params;
    const profile = await getMemoryCached(`leader-profile:${leaderId}`, 10_000, () =>
      getLeaderProfileData(leaderId),
    );

    if (!profile) {
      return NextResponse.json({ error: "Leader not found." }, { status: 404 });
    }

    return jsonWithCache(profile);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
