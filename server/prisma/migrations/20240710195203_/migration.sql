/*
  Warnings:

  - You are about to drop the column `userId` on the `NotificationsOnUsers` table. All the data in the column will be lost.
  - Added the required column `username` to the `NotificationsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "NotificationsOnUsers" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "NotificationsOnUsers" ADD CONSTRAINT "NotificationsOnUsers_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
