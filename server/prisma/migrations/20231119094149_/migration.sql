/*
  Warnings:

  - You are about to drop the column `panopticons` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "panopticons";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "panopticons" INTEGER NOT NULL DEFAULT 0;
