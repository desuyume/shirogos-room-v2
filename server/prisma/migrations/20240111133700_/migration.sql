/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `CharacterCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterCategory_title_key" ON "CharacterCategory"("title");
