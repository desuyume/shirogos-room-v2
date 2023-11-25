/*
  Warnings:

  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RewardType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_rewardTypeId_fkey";

-- DropTable
DROP TABLE "Reward";

-- DropTable
DROP TABLE "RewardType";

-- CreateTable
CREATE TABLE "rewards" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "rewardTypeId" INTEGER NOT NULL,
    "reward_img" TEXT NOT NULL,
    "category" "RewardCategory" NOT NULL DEFAULT 'BOUTIQUE',

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "reward_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_rewardTypeId_fkey" FOREIGN KEY ("rewardTypeId") REFERENCES "reward_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
