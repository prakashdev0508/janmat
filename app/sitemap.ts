import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";

/** Generate at request time so `next build` does not require a live database. */
export const dynamic = "force-dynamic";

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/compare", changeFrequency: "weekly", priority: 0.9 },
  { path: "/regions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.85 },
  { path: "/vote", changeFrequency: "daily", priority: 0.85 },
  { path: "/vote/confirmation", changeFrequency: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  let leaderEntries: MetadataRoute.Sitemap = [];
  try {
    const leaders = await prisma.leader.findMany({
      select: { id: true, createdAt: true },
    });
    leaderEntries = leaders.map((leader) => ({
      url: `${base}/leaders/${leader.id}`,
      lastModified: leader.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Omit leader URLs if the database is unreachable; static routes remain valid.
  }

  return [...staticEntries, ...leaderEntries];
}
