/*
  Warnings:

  - You are about to drop the column `randomAdjectiveRoleId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `randomNounRoleId` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "randomAdjectiveRoleId",
DROP COLUMN "randomNounRoleId";
