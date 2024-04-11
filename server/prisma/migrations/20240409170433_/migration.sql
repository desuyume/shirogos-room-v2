/*
  Warnings:

  - You are about to drop the column `BackgroundId` on the `BackroundsOnRooms` table. All the data in the column will be lost.
  - Added the required column `backgroundId` to the `BackroundsOnRooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_BackgroundId_fkey";

-- AlterTable
ALTER TABLE "BackroundsOnRooms" DROP COLUMN "BackgroundId",
ADD COLUMN     "backgroundId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BackroundsOnRooms" ADD CONSTRAINT "BackroundsOnRooms_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
