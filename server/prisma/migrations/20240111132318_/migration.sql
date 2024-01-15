/*
  Warnings:

  - You are about to drop the column `category` on the `characters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "category",
ADD COLUMN     "characterCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "CharacterCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "CharacterCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_characterCategoryId_fkey" FOREIGN KEY ("characterCategoryId") REFERENCES "CharacterCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
