import { VoteType } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { syncSupabaseUserToPrisma } from "@/lib/user-sync";

export const runtime = "nodejs";

function getUtcDateStart(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

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
    const now = new Date();
    const voteDate = getUtcDateStart(now);

    await prisma.$transaction(async (tx) => {
      const existingVoteToday = await tx.vote.findFirst({
        where: { userId: user.id, leaderId, voteDate },
        select: {
          createdAt: true,
          type: true,
        },
      });

      if (existingVoteToday) {
        throw new Error("DUPLICATE_VOTE_TODAY");
      }

      await tx.vote.create({
        data: {
          userId: user.id,
          leaderId,
          type: voteType,
          createdAt: now,
          voteDate,
        },
      });

      const totals = await tx.vote.groupBy({
        by: ["type"],
        where: { leaderId },
        _count: {
          _all: true,
        },
      });

      const upvotes =
        totals.find((entry) => entry.type === VoteType.UPVOTE)?._count._all ?? 0;
      const downvotes =
        totals.find((entry) => entry.type === VoteType.DOWNVOTE)?._count._all ?? 0;
      const totalVotes = upvotes + downvotes;
      const popularity =
        totalVotes === 0 ? 0 : Number(((upvotes / totalVotes) * 100).toFixed(1));

      await tx.leaderVoteSummary.upsert({
        where: { leaderId },
        create: {
          leaderId,
          upvotes,
          downvotes,
          totalVotes,
          popularity,
        },
        update: {
          upvotes,
          downvotes,
          totalVotes,
          popularity,
        },
      });

      const dailyTotals = await tx.vote.groupBy({
        by: ["type"],
        where: {
          leaderId,
          createdAt: {
            gte: voteDate,
            lt: new Date(voteDate.getTime() + 24 * 60 * 60 * 1000),
          },
        },
        _count: {
          _all: true,
        },
      });

      const dailyUpvotes =
        dailyTotals.find((entry) => entry.type === VoteType.UPVOTE)?._count._all ?? 0;
      const dailyDownvotes =
        dailyTotals.find((entry) => entry.type === VoteType.DOWNVOTE)?._count._all ?? 0;
      const dailyTotalVotes = dailyUpvotes + dailyDownvotes;

      await tx.leaderDailyVoteSummary.upsert({
        where: {
          leaderId_date: {
            leaderId,
            date: voteDate,
          },
        },
        create: {
          leaderId,
          date: voteDate,
          upvotes: dailyUpvotes,
          downvotes: dailyDownvotes,
          totalVotes: dailyTotalVotes,
        },
        update: {
          upvotes: dailyUpvotes,
          downvotes: dailyDownvotes,
          totalVotes: dailyTotalVotes,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "DUPLICATE_VOTE_TODAY") {
      return NextResponse.json(
        { error: "You have already voted for this leader today. Please try again tomorrow." },
        { status: 409 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
