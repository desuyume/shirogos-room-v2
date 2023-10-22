-- DropForeignKey
ALTER TABLE "old_nicknames" DROP CONSTRAINT "old_nicknames_userId_fkey";

-- DropIndex
DROP INDEX "old_nicknames_userId_key";

-- AlterTable
ALTER TABLE "old_nicknames" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "old_nicknames" ADD CONSTRAINT "old_nicknames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
