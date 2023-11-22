/*
  Warnings:

  - Added the required column `randomAdjectiveRoleId` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `randomNounRoleId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "randomAdjectiveRoleId" INTEGER NOT NULL,
ADD COLUMN     "randomNounRoleId" INTEGER NOT NULL,
ADD COLUMN     "random_unique_role_adjective" TEXT,
ADD COLUMN     "random_unique_role_noun" TEXT;
