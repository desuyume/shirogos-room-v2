/*
  Warnings:

  - You are about to drop the column `badge_img` on the `badges` table. All the data in the column will be lost.
  - Added the required column `badgeImg` to the `badges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "badges" DROP COLUMN "badge_img",
ADD COLUMN     "badgeImg" TEXT NOT NULL;
