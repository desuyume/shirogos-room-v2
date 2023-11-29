-- CreateTable
CREATE TABLE "AwardsOnRooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "awardId" INTEGER NOT NULL,

    CONSTRAINT "AwardsOnRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AwardsOnRooms" ADD CONSTRAINT "AwardsOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardsOnRooms" ADD CONSTRAINT "AwardsOnRooms_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "awards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
