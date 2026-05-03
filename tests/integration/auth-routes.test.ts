// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const signOutMock = vi.fn();

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(() => ({
    auth: {
      signOut: signOutMock,
    },
  })),
}));

describe("auth routes", () => {
  beforeEach(() => {
    signOutMock.mockReset();
  });

  it("login route returns disabled message", async () => {
    const { POST } = await import("@/app/api/auth/login/route");
    const response = await POST();
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Email/password login is disabled. Please continue with Google.",
    });
  });

  it("logout route signs out and returns success", async () => {
    signOutMock.mockResolvedValueOnce({});
    const { POST } = await import("@/app/api/auth/logout/route");
    const response = await POST();
    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
