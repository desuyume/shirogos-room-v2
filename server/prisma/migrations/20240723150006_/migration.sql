/*
  Warnings:

  - You are about to drop the column `username` on the `NotificationsOnUsers` table. All the data in the column will be lost.
  - Added the required column `userId` to the `NotificationsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_username_fkey";

-- AlterTable
ALTER TABLE "NotificationsOnUsers" DROP COLUMN "username",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "NotificationsOnUsers" ADD CONSTRAINT "NotificationsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
