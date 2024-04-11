/*
  Warnings:

  - You are about to drop the column `award_img` on the `badges` table. All the data in the column will be lost.
  - Added the required column `badge_img` to the `badges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "badge_types" RENAME CONSTRAINT "award_types_pkey" TO "badge_types_pkey";

-- AlterTable
ALTER TABLE "badges" DROP COLUMN "award_img",
ADD COLUMN     "badge_img" TEXT NOT NULL,
ALTER COLUMN "isForSale" DROP DEFAULT;

-- RenameIndex
ALTER INDEX "award_types_title_key" RENAME TO "badge_types_title_key";

-- RenameIndex
ALTER INDEX "award_types_type_key" RENAME TO "badge_types_type_key";
