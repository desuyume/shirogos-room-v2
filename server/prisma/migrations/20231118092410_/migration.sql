-- CreateTable
CREATE TABLE "PanopticonsOnRooms" (
    "roomId" INTEGER NOT NULL,
    "panopticonId" INTEGER NOT NULL,

    CONSTRAINT "PanopticonsOnRooms_pkey" PRIMARY KEY ("roomId","panopticonId")
);

-- AddForeignKey
ALTER TABLE "PanopticonsOnRooms" ADD CONSTRAINT "PanopticonsOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanopticonsOnRooms" ADD CONSTRAINT "PanopticonsOnRooms_panopticonId_fkey" FOREIGN KEY ("panopticonId") REFERENCES "panopticons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
