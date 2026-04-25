import { VoteType } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { syncSupabaseUserToPrisma } from "@/lib/user-sync";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { error: "For vote you have to login to the account." },
        { status: 401 },
      );
    }

    const user = await syncSupabaseUserToPrisma(authUser, supabase);

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
          userId: user.id,
          leaderId,
        },
      },
      create: {
        userId: user.id,
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
