-- DropIndex
DROP INDEX "Vote_userId_leaderId_key";

-- AlterTable
ALTER TABLE "LeaderVoteSummary" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "voteDate" DATE NOT NULL DEFAULT CURRENT_DATE;

-- CreateIndex
CREATE INDEX "Vote_userId_voteDate_idx" ON "Vote"("userId", "voteDate");

-- CreateIndex
CREATE INDEX "Vote_leaderId_voteDate_idx" ON "Vote"("leaderId", "voteDate");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_leaderId_voteDate_key" ON "Vote"("userId", "leaderId", "voteDate");

