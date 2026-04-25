-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'GOOGLE';
