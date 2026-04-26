import { NextResponse } from "next/server";
import { getMemoryCached, jsonWithCache } from "@/lib/api-cache";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const payload = await getMemoryCached("regions-facets", 300_000, async () => {
      const [states, parties, leaderCount] = await Promise.all([
        prisma.state.findMany({
          orderBy: { name: "asc" },
          include: {
            _count: {
              select: { leaders: true },
            },
          },
        }),
        prisma.party.findMany({
          orderBy: [{ leaders: { _count: "desc" } }, { name: "asc" }],
          take: 10,
          include: {
            _count: {
              select: { leaders: true },
            },
          },
        }),
        prisma.leader.count(),
      ]);

      return {
        regions: [
          { id: "all", label: "All India", count: leaderCount },
          ...states.map((state) => ({
            id: state.id,
            label: state.name,
            count: state._count.leaders,
          })),
        ],
        parties: parties.map((party) => ({
          id: party.id,
          label: party.shortName || party.name,
          count: party._count.leaders,
        })),
        sortOptions: [
          { id: "popularity_desc", label: "Popularity (High to Low)" },
          { id: "votes_desc", label: "Total Vote Count" },
          { id: "name_asc", label: "Name (A-Z)" },
        ],
      };
    });

    return jsonWithCache(payload, "facets");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
