/*
  Warnings:

  - The primary key for the `characters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `characters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "character_characteristics" DROP CONSTRAINT "character_characteristics_characterId_fkey";

-- DropForeignKey
ALTER TABLE "character_descriptions" DROP CONSTRAINT "character_descriptions_characterId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_characterId_fkey";

-- AlterTable
ALTER TABLE "character_characteristics" ALTER COLUMN "characterId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "character_descriptions" ALTER COLUMN "characterId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "characters" DROP CONSTRAINT "characters_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "characters_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "characters_id_seq";

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "characterId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "characters_id_key" ON "characters"("id");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_descriptions" ADD CONSTRAINT "character_descriptions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_characteristics" ADD CONSTRAINT "character_characteristics_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
