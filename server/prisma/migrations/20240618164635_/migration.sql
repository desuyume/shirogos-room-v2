/*
  Warnings:

  - Made the column `buyed_cost` on table `PanopticonsOnRooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PanopticonsOnRooms" ALTER COLUMN "buyed_cost" SET NOT NULL;
