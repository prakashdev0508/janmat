-- CreateTable
CREATE TABLE "LeaderVoteSummary" (
    "leaderId" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderVoteSummary_pkey" PRIMARY KEY ("leaderId")
);

-- CreateTable
CREATE TABLE "LeaderDailyVoteSummary" (
    "leaderId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LeaderDailyVoteSummary_pkey" PRIMARY KEY ("leaderId","date")
);

-- Backfill one summary row per leader so public read APIs can use cheap joins.
INSERT INTO "LeaderVoteSummary" ("leaderId", "upvotes", "downvotes", "totalVotes", "popularity", "updatedAt")
SELECT
    l."id",
    COUNT(v.*) FILTER (WHERE v."type" = 'UPVOTE')::INTEGER AS "upvotes",
    COUNT(v.*) FILTER (WHERE v."type" = 'DOWNVOTE')::INTEGER AS "downvotes",
    COUNT(v.*)::INTEGER AS "totalVotes",
    CASE
        WHEN COUNT(v.*) = 0 THEN 0
        ELSE ROUND((COUNT(v.*) FILTER (WHERE v."type" = 'UPVOTE')::NUMERIC / COUNT(v.*)::NUMERIC) * 100, 1)::DOUBLE PRECISION
    END AS "popularity",
    CURRENT_TIMESTAMP
FROM "Leader" l
LEFT JOIN "Vote" v ON v."leaderId" = l."id"
GROUP BY l."id";

-- Backfill per-day summaries from existing votes.
INSERT INTO "LeaderDailyVoteSummary" ("leaderId", "date", "upvotes", "downvotes", "totalVotes")
SELECT
    v."leaderId",
    v."createdAt"::DATE AS "date",
    COUNT(*) FILTER (WHERE v."type" = 'UPVOTE')::INTEGER AS "upvotes",
    COUNT(*) FILTER (WHERE v."type" = 'DOWNVOTE')::INTEGER AS "downvotes",
    COUNT(*)::INTEGER AS "totalVotes"
FROM "Vote" v
GROUP BY v."leaderId", v."createdAt"::DATE;

-- CreateIndex
CREATE INDEX "Leader_stateId_idx" ON "Leader"("stateId");

-- CreateIndex
CREATE INDEX "Leader_partyId_idx" ON "Leader"("partyId");

-- CreateIndex
CREATE INDEX "Leader_type_idx" ON "Leader"("type");

-- CreateIndex
CREATE INDEX "Leader_stateId_type_idx" ON "Leader"("stateId", "type");

-- CreateIndex
CREATE INDEX "Leader_partyId_type_idx" ON "Leader"("partyId", "type");

-- CreateIndex
CREATE INDEX "Vote_leaderId_idx" ON "Vote"("leaderId");

-- CreateIndex
CREATE INDEX "Vote_userId_createdAt_idx" ON "Vote"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Vote_leaderId_createdAt_idx" ON "Vote"("leaderId", "createdAt");

-- CreateIndex
CREATE INDEX "LeaderVoteSummary_popularity_totalVotes_idx" ON "LeaderVoteSummary"("popularity", "totalVotes");

-- CreateIndex
CREATE INDEX "LeaderVoteSummary_totalVotes_idx" ON "LeaderVoteSummary"("totalVotes");

-- CreateIndex
CREATE INDEX "LeaderDailyVoteSummary_date_totalVotes_idx" ON "LeaderDailyVoteSummary"("date", "totalVotes");

-- CreateIndex
CREATE INDEX "LeaderDailyVoteSummary_leaderId_date_idx" ON "LeaderDailyVoteSummary"("leaderId", "date");

-- AddForeignKey
ALTER TABLE "LeaderVoteSummary" ADD CONSTRAINT "LeaderVoteSummary_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Leader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderDailyVoteSummary" ADD CONSTRAINT "LeaderDailyVoteSummary_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Leader"("id") ON DELETE CASCADE ON UPDATE CASCADE;
