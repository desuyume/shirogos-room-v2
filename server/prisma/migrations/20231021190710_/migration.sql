/*
  Warnings:

  - You are about to drop the `old_nicknames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "old_nicknames" DROP CONSTRAINT "old_nicknames_userId_fkey";

-- DropTable
DROP TABLE "old_nicknames";

-- CreateTable
CREATE TABLE "past_usernames" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "past_usernames_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "past_usernames" ADD CONSTRAINT "past_usernames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
