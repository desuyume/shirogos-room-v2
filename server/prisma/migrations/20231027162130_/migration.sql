-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';
