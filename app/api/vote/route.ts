import { VoteType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

function getCookieValue(cookieHeader: string | null, cookieName: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  for (const part of parts) {
    if (part.startsWith(`${cookieName}=`)) {
      return decodeURIComponent(part.slice(cookieName.length + 1));
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const token = getCookieValue(
      request.headers.get("cookie"),
      getSessionCookieName(),
    );
    if (!token) {
      return NextResponse.json(
        { error: "For vote you have to login to the account." },
        { status: 401 },
      );
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { error: "For vote you have to login to the account." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      leaderId?: string;
      choice?: "approve" | "reject";
    };
    const leaderId = body.leaderId?.trim();
    const choice = body.choice;

    if (!leaderId || (choice !== "approve" && choice !== "reject")) {
      return NextResponse.json(
        { error: "leaderId and valid vote choice are required." },
        { status: 400 },
      );
    }

    const leader = await prisma.leader.findUnique({ where: { id: leaderId } });
    if (!leader) {
      return NextResponse.json({ error: "Leader not found." }, { status: 404 });
    }

    const voteType = choice === "approve" ? VoteType.UPVOTE : VoteType.DOWNVOTE;

    await prisma.vote.upsert({
      where: {
        userId_leaderId: {
          userId: session.userId,
          leaderId,
        },
      },
      create: {
        userId: session.userId,
        leaderId,
        type: voteType,
      },
      update: {
        type: voteType,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
