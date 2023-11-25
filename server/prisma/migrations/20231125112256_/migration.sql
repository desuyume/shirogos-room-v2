-- CreateEnum
CREATE TYPE "RewardCategory" AS ENUM ('BOUTIQUE', 'SPECIAL');

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "rewardTypeId" INTEGER NOT NULL,
    "reward_img" TEXT NOT NULL,
    "category" "RewardCategory" NOT NULL DEFAULT 'BOUTIQUE',

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "RewardType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "RewardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
