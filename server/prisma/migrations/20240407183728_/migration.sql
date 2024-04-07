/*
  Warnings:

  - A unique constraint covering the columns `[achievementId]` on the table `achievement_awards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `achievementId` to the `achievement_awards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "achievement_awards" ADD COLUMN     "achievementId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "achievement_awards_achievementId_key" ON "achievement_awards"("achievementId");

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
