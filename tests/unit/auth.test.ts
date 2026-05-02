// @vitest-environment node

import { afterEach, describe, expect, it } from "vitest";

const originalSecret = process.env.AUTH_SECRET;

describe("lib/auth", () => {
  afterEach(() => {
    process.env.AUTH_SECRET = originalSecret;
  });

  it("hashes and verifies password", async () => {
    process.env.AUTH_SECRET = "unit-test-secret";
    const { hashPassword, verifyPassword } = await import("@/lib/auth");

    const hash = await hashPassword("my-password");
    expect(hash).not.toBe("my-password");
    await expect(verifyPassword("my-password", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong-password", hash)).resolves.toBe(false);
  });

  it("creates and verifies session token payload", async () => {
    process.env.AUTH_SECRET = "unit-test-secret";
    const { createSessionToken, verifySessionToken } = await import("@/lib/auth");

    const token = await createSessionToken({ userId: "u1", email: "hello@example.com" });
    const payload = await verifySessionToken(token);

    expect(payload).toEqual({ userId: "u1", email: "hello@example.com" });
  });

  it("throws when secret is missing", async () => {
    delete process.env.AUTH_SECRET;
    const { createSessionToken } = await import("@/lib/auth");

    await expect(createSessionToken({ userId: "u1", email: "hello@example.com" })).rejects.toThrow(
      "AUTH_SECRET is required.",
    );
  });

  it("returns null for invalid token", async () => {
    process.env.AUTH_SECRET = "unit-test-secret";
    const { verifySessionToken } = await import("@/lib/auth");
    await expect(verifySessionToken("bad-token")).resolves.toBeNull();
  });
});
