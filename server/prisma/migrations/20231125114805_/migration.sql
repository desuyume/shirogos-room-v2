/*
  Warnings:

  - You are about to drop the `reward_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rewards` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AwardCategory" AS ENUM ('BOUTIQUE', 'SPECIAL');

-- DropForeignKey
ALTER TABLE "rewards" DROP CONSTRAINT "rewards_rewardTypeId_fkey";

-- DropTable
DROP TABLE "reward_types";

-- DropTable
DROP TABLE "rewards";

-- DropEnum
DROP TYPE "RewardCategory";

-- CreateTable
CREATE TABLE "awards" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "awardTypeId" INTEGER NOT NULL,
    "award_img" TEXT NOT NULL,
    "category" "AwardCategory" NOT NULL DEFAULT 'BOUTIQUE',

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "award_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "award_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "award_types_type_key" ON "award_types"("type");

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_awardTypeId_fkey" FOREIGN KEY ("awardTypeId") REFERENCES "award_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
