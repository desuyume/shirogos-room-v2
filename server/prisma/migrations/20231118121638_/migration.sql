/*
  Warnings:

  - The primary key for the `BackroundsOnRooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PanopticonsOnRooms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BackroundsOnRooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PanopticonsOnRooms" DROP CONSTRAINT "PanopticonsOnRooms_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PanopticonsOnRooms_pkey" PRIMARY KEY ("id");
