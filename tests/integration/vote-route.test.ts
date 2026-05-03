// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import { VoteType } from "@prisma/client";

const getUserMock = vi.fn();
const findLeaderMock = vi.fn();
const transactionMock = vi.fn();
const syncUserMock = vi.fn();

const tx = {
  vote: {
    findFirst: vi.fn(),
    create: vi.fn(),
    groupBy: vi.fn(),
  },
  leaderVoteSummary: {
    upsert: vi.fn(),
  },
  leaderDailyVoteSummary: {
    upsert: vi.fn(),
  },
};

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: getUserMock,
    },
  })),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    leader: {
      findUnique: findLeaderMock,
    },
    $transaction: transactionMock,
  },
}));

vi.mock("@/lib/user-sync", () => ({
  syncSupabaseUserToPrisma: syncUserMock,
}));

function createRequest(body: unknown): Request {
  return new Request("http://localhost/api/vote", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/vote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findLeaderMock.mockResolvedValue({ id: "leader-1" });
    syncUserMock.mockResolvedValue({ id: "user-1" });
    transactionMock.mockImplementation(async (cb: (txArg: typeof tx) => Promise<void>) => cb(tx));
    tx.vote.findFirst.mockResolvedValue(null);
    tx.vote.groupBy
      .mockResolvedValueOnce([{ type: VoteType.UPVOTE, _count: { _all: 4 } }])
      .mockResolvedValueOnce([{ type: VoteType.UPVOTE, _count: { _all: 1 } }]);
    getUserMock.mockResolvedValue({
      data: { user: { id: "supabase-user-1", email: "test@example.com", user_metadata: {} } },
      error: null,
    });
  });

  it("returns 401 for unauthenticated users", async () => {
    getUserMock.mockResolvedValueOnce({ data: { user: null }, error: { message: "unauthorized" } });
    const { POST } = await import("@/app/api/vote/route");

    const response = await POST(createRequest({ leaderId: "leader-1", choice: "approve" }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "For vote you have to login to the account.",
    });
  });

  it("returns 400 for invalid payload", async () => {
    const { POST } = await import("@/app/api/vote/route");
    const response = await POST(createRequest({ leaderId: "", choice: "invalid" }));
    expect(response.status).toBe(400);
  });

  it("returns 404 when leader does not exist", async () => {
    findLeaderMock.mockResolvedValueOnce(null);
    const { POST } = await import("@/app/api/vote/route");
    const response = await POST(createRequest({ leaderId: "missing", choice: "approve" }));
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Leader not found." });
  });

  it("returns 409 for duplicate vote on same day", async () => {
    tx.vote.findFirst.mockResolvedValueOnce({ createdAt: new Date(), type: VoteType.UPVOTE });
    const { POST } = await import("@/app/api/vote/route");
    const response = await POST(createRequest({ leaderId: "leader-1", choice: "approve" }));
    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: "You have already voted for this leader today. Please try again tomorrow.",
    });
  });

  it("stores vote and updates aggregate summaries", async () => {
    const { POST } = await import("@/app/api/vote/route");
    const response = await POST(createRequest({ leaderId: "leader-1", choice: "approve" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(tx.vote.create).toHaveBeenCalledTimes(1);
    expect(tx.vote.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "user-1",
          leaderId: "leader-1",
          type: VoteType.UPVOTE,
        }),
      }),
    );
    expect(tx.leaderVoteSummary.upsert).toHaveBeenCalledTimes(1);
    expect(tx.leaderDailyVoteSummary.upsert).toHaveBeenCalledTimes(1);
  });
});
