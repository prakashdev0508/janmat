import { NextResponse } from "next/server";

type CacheProfile = "live" | "facets";
type MemoryCacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const cacheHeaders: Record<CacheProfile, string> = {
  live: "public, s-maxage=10, stale-while-revalidate=60",
  facets: "public, s-maxage=300, stale-while-revalidate=3600",
};

const globalForApiCache = globalThis as typeof globalThis & {
  apiMemoryCache?: Map<string, MemoryCacheEntry<unknown>>;
};

const apiMemoryCache = globalForApiCache.apiMemoryCache ?? new Map<string, MemoryCacheEntry<unknown>>();

if (!globalForApiCache.apiMemoryCache) {
  globalForApiCache.apiMemoryCache = apiMemoryCache;
}

export function jsonWithCache<T>(
  body: T,
  profile: CacheProfile = "live",
  init?: ResponseInit,
) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", cacheHeaders[profile]);
  return response;
}

export async function getMemoryCached<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const cached = apiMemoryCache.get(key) as MemoryCacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const value = await loader();
  apiMemoryCache.set(key, {
    value,
    expiresAt: now + ttlMs,
  });
  return value;
}
