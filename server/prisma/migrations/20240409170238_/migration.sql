/*
  Warnings:

  - You are about to drop the `room_backgrounds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_BackgroundId_fkey";

-- DropForeignKey
ALTER TABLE "achievement_awards" DROP CONSTRAINT "achievement_awards_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_backgroundId_fkey";

-- DropTable
DROP TABLE "room_backgrounds";

-- CreateTable
CREATE TABLE "backgrounds" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,
    "isForSale" BOOLEAN NOT NULL,

    CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackroundsOnRooms" ADD CONSTRAINT "BackroundsOnRooms_BackgroundId_fkey" FOREIGN KEY ("BackgroundId") REFERENCES "backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
