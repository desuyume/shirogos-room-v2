/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `reward_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reward_types_type_key" ON "reward_types"("type");
