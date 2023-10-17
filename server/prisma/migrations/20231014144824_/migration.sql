/*
  Warnings:

  - You are about to drop the column `roomId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roomId_fkey";

-- DropIndex
DROP INDEX "users_roomId_key";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roomId";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_userId_key" ON "rooms"("userId");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
