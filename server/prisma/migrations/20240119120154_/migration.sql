/*
  Warnings:

  - Added the required column `cover_img` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manga" ADD COLUMN     "cover_img" TEXT NOT NULL;
