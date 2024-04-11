/*
  Warnings:

  - You are about to drop the column `roomBackgroundId` on the `BackroundsOnRooms` table. All the data in the column will be lost.
  - You are about to drop the column `roomBackgorundId` on the `achievement_awards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `room_backgrounds` table. All the data in the column will be lost.
  - You are about to drop the column `roomBackgroundId` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `BackgroundId` to the `BackroundsOnRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isForSale` to the `panopticons` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `panopticons` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `isForSale` to the `room_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `room_backgrounds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_roomBackgroundId_fkey";

-- DropForeignKey
ALTER TABLE "achievement_awards" DROP CONSTRAINT "achievement_awards_roomBackgorundId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_roomBackgroundId_fkey";

-- AlterTable
ALTER TABLE "BackroundsOnRooms" DROP COLUMN "roomBackgroundId",
ADD COLUMN     "BackgroundId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "achievement_awards" DROP COLUMN "roomBackgorundId",
ADD COLUMN     "backgroundId" INTEGER;

-- AlterTable
ALTER TABLE "panopticons" ADD COLUMN     "isForSale" BOOLEAN NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "room_backgrounds" DROP COLUMN "name",
ADD COLUMN     "isForSale" BOOLEAN NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "roomBackgroundId",
ADD COLUMN     "backgroundId" INTEGER;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "room_backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackroundsOnRooms" ADD CONSTRAINT "BackroundsOnRooms_BackgroundId_fkey" FOREIGN KEY ("BackgroundId") REFERENCES "room_backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "room_backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
