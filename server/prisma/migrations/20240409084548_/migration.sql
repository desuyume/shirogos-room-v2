/*
  Warnings:

  - You are about to drop the `AwardsOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `award_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `awards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey


-- DropForeignKey


-- DropForeignKey
-- ALTER TABLE "achievement_awards" DROP CONSTRAINT "achievement_awards_badgeId_fkey";

-- DropForeignKey


-- DropForeignKey
-- ALTER TABLE "editor_badges" DROP CONSTRAINT "editor_badges_badgeId_fkey";

-- -- DropTable
-- DROP TABLE "AwardsOnRooms";

-- -- DropTable
-- DROP TABLE "award_types";

-- -- DropTable
-- DROP TABLE "awards";

ALTER TABLE IF EXISTS "awards" RENAME TO "badges";
ALTER TABLE "badges" RENAME COLUMN "awardTypeId" TO "typeId";
ALTER TABLE "badges" RENAME CONSTRAINT "awards_pkey" TO "badges_pkey";
ALTER TABLE "badges" ADD COLUMN "isForSale" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "badges" DROP COLUMN "category";


-- DropEnum
DROP TYPE "AwardCategory";

-- CreateTable

--  (
--     "id" SERIAL NOT NULL,
--     "cost" INTEGER NOT NULL DEFAULT 0,
--     "title" TEXT NOT NULL,
--     "typeId" INTEGER NOT NULL,
--     "badge_img" TEXT NOT NULL,
--     "isForSale" BOOLEAN NOT NULL,

--     CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
-- );

-- CreateTable
ALTER TABLE IF EXISTS "award_types" RENAME TO "badge_types";

--  (
--     "id" SERIAL NOT NULL,
--     "title" TEXT NOT NULL,
--     "type" TEXT NOT NULL,

--     CONSTRAINT "badge_types_pkey" PRIMARY KEY ("id")
-- );

-- AlterTable
ALTER TABLE IF EXISTS "AwardsOnRooms" RENAME TO "BadgesOnRooms";
ALTER TABLE "BadgesOnRooms" RENAME COLUMN "awardId" TO "badgeId";
ALTER TABLE "BadgesOnRooms" RENAME CONSTRAINT "AwardsOnRooms_pkey" TO "BadgesOnRooms_pkey";

ALTER TABLE "BadgesOnRooms" RENAME CONSTRAINT "AwardsOnRooms_awardId_fkey" TO "BadgesOnRooms_badgeId_fkey";
ALTER TABLE "BadgesOnRooms" RENAME CONSTRAINT "AwardsOnRooms_roomId_fkey" TO "BadgesOnRooms_roomId_fkey";
ALTER TABLE "badges" RENAME CONSTRAINT "awards_awardTypeId_fkey" TO "badges_typeId_fkey";

--  (
--     "id" SERIAL NOT NULL,
--     "roomId" INTEGER NOT NULL,
--     "badgeId" INTEGER NOT NULL,

--     CONSTRAINT "BadgesOnRooms_pkey" PRIMARY KEY ("id")
-- );

-- CreateIndex
-- CREATE UNIQUE INDEX "badge_types_title_key" ON "badge_types"("title");

-- CreateIndex
-- CREATE UNIQUE INDEX "badge_types_type_key" ON "badge_types"("type");

