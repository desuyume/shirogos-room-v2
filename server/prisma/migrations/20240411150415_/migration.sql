/*
  Warnings:

  - You are about to drop the column `frameImg` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `badgeImg` on the `badges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Frame" DROP COLUMN "frameImg",
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "badges" DROP COLUMN "badgeImg",
ADD COLUMN     "img" TEXT;
