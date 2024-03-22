/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `editors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "editors_roomId_key" ON "editors"("roomId");
