/*
  Warnings:

  - You are about to drop the column `panopticons` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "panopticons" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "panopticons";
