export type ExperimentDefinition = {
  id: string;
  variants: readonly string[];
  rolloutPercentage: number;
  fallbackVariant: string;
};

export const EXPERIMENTS = {
  voteCtaCopyV1: {
    id: "vote_cta_copy_v1",
    variants: ["control", "compact_copy"] as const,
    rolloutPercentage: 100,
    fallbackVariant: "control",
  },
} as const;

const EXPERIMENT_COOKIE_PREFIX = "lv_exp_";
const EXPERIMENT_SESSION_COOKIE = "lv_exp_session";

function stringHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getExperimentVariant(
  experiment: ExperimentDefinition,
  sessionKey: string,
): string {
  if (!sessionKey) {
    return experiment.fallbackVariant;
  }

  const rolloutBucket = stringHash(`${experiment.id}:${sessionKey}:rollout`) % 100;
  if (rolloutBucket >= experiment.rolloutPercentage) {
    return experiment.fallbackVariant;
  }

  const variantBucket = stringHash(`${experiment.id}:${sessionKey}:variant`) % experiment.variants.length;
  return experiment.variants[variantBucket] ?? experiment.fallbackVariant;
}

export function getExperimentCookieName(experimentId: string): string {
  return `${EXPERIMENT_COOKIE_PREFIX}${experimentId}`;
}

function parseCookies(cookieString: string): Record<string, string> {
  return cookieString
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, ...valueParts] = cookie.split("=");
      if (!key) return acc;
      acc[key] = decodeURIComponent(valueParts.join("="));
      return acc;
    }, {});
}

export function readCookieValue(cookieString: string, key: string): string | null {
  const cookies = parseCookies(cookieString);
  return cookies[key] ?? null;
}

function getRandomSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `lv-${Math.random().toString(36).slice(2, 12)}`;
}

export function ensureExperimentSessionKey(cookieString: string): {
  key: string;
  shouldPersist: boolean;
} {
  const existing = readCookieValue(cookieString, EXPERIMENT_SESSION_COOKIE);
  if (existing) {
    return { key: existing, shouldPersist: false };
  }
  return { key: getRandomSessionId(), shouldPersist: true };
}

export function buildCookieString(name: string, value: string, maxAgeSeconds: number): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export async function logExperimentExposure(payload: {
  experimentId: string;
  variant: string;
  sessionKey: string;
}): Promise<void> {
  try {
    await fetch("/api/experiments/exposure", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Exposure logging should never block user actions.
  }
}

export const experimentSessionCookieName = EXPERIMENT_SESSION_COOKIE;
