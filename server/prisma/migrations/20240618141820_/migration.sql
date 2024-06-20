/*
  Warnings:

  - You are about to drop the column `uniqueRoleId` on the `achievement_awards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "achievement_awards" DROP CONSTRAINT "achievement_awards_uniqueRoleId_fkey";

-- AlterTable
ALTER TABLE "achievement_awards" DROP COLUMN "uniqueRoleId",
ADD COLUMN     "adjectiveId" INTEGER,
ADD COLUMN     "nounId" INTEGER;
