/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `award_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `award_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "award_types" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "award_types_title_key" ON "award_types"("title");
