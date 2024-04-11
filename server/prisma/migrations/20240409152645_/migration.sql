-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "frameId" INTEGER;

-- CreateTable
CREATE TABLE "Frame" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "frameImg" TEXT,
    "isForSale" BOOLEAN NOT NULL,

    CONSTRAINT "Frame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FramesOnRooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "frameId" INTEGER NOT NULL,

    CONSTRAINT "FramesOnRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "Frame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FramesOnRooms" ADD CONSTRAINT "FramesOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FramesOnRooms" ADD CONSTRAINT "FramesOnRooms_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "Frame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
