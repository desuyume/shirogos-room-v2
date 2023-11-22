/*
  Warnings:

  - Added the required column `buyed_cost` to the `PanopticonsOnRooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PanopticonsOnRooms" ADD COLUMN     "buyed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "buyed_cost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "panopticons" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;
