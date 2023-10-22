/*
  Warnings:

  - You are about to drop the column `nickname` on the `past_usernames` table. All the data in the column will be lost.
  - Added the required column `username` to the `past_usernames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "past_usernames" DROP COLUMN "nickname",
ADD COLUMN     "username" TEXT NOT NULL;
