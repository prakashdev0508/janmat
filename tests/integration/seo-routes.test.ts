// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const findManyMock = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    leader: {
      findMany: findManyMock,
    },
  },
}));

describe("SEO metadata routes", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    findManyMock.mockResolvedValue([
      { id: "leader-a", createdAt: new Date("2025-01-15T00:00:00.000Z") },
    ]);
  });

  it("robots() lists disallow paths and sitemap URL", async () => {
    const { default: robots } = await import("@/app/robots");
    const r = robots();
    expect(r.sitemap).toBe("https://example.com/sitemap.xml");
    expect(r.rules?.[0]?.userAgent).toBe("*");
    expect(r.rules?.[0]?.disallow).toEqual(["/dashboard", "/login", "/leaders/upload"]);
  });

  it("sitemap() includes static URLs and leader rows from Prisma", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://example.com/");
    expect(urls).toContain("https://example.com/compare");
    expect(urls).toContain("https://example.com/leaders/leader-a");
    expect(findManyMock).toHaveBeenCalled();
  });
});
