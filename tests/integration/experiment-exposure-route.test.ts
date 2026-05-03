// @vitest-environment node

import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/experiments/exposure/route";

describe("POST /api/experiments/exposure", () => {
  it("returns 400 when required fields are missing", async () => {
    const response = await POST(
      new Request("http://localhost/api/experiments/exposure", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ experimentId: "x" }),
      }),
    );
    expect(response.status).toBe(400);
  });

  it("returns success for valid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/experiments/exposure", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ experimentId: "vote_cta_copy_v1", variant: "control", sessionKey: "s1" }),
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
