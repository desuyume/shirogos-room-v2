/*
  Warnings:

  - You are about to drop the `CharacterCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MangaChapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MangaPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WidgetType" AS ENUM ('UNIQUE_ROLE', 'STATISTIC', 'FAVORITE_CHARACTER', 'NOTEPAD');

-- DropForeignKey
ALTER TABLE "MangaChapter" DROP CONSTRAINT "MangaChapter_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "MangaPage" DROP CONSTRAINT "MangaPage_mangaChapterId_fkey";

-- DropForeignKey
ALTER TABLE "StoryPage" DROP CONSTRAINT "StoryPage_storyId_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_characterCategoryId_fkey";

-- DropTable
DROP TABLE "CharacterCategory";

-- DropTable
DROP TABLE "Manga";

-- DropTable
DROP TABLE "MangaChapter";

-- DropTable
DROP TABLE "MangaPage";

-- DropTable
DROP TABLE "Story";

-- DropTable
DROP TABLE "StoryPage";

-- CreateTable
CREATE TABLE "character_categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "character_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover_img" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "mangas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_chapters" (
    "id" SERIAL NOT NULL,
    "chapter" INTEGER NOT NULL,
    "mangaId" TEXT NOT NULL,

    CONSTRAINT "manga_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga_pages" (
    "id" SERIAL NOT NULL,
    "page_number" INTEGER NOT NULL,
    "page_img" TEXT NOT NULL,
    "mangaChapterId" INTEGER,

    CONSTRAINT "manga_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_img" TEXT NOT NULL,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_pages" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "page_num" INTEGER NOT NULL,
    "storyId" TEXT,

    CONSTRAINT "story_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editors" (
    "id" SERIAL NOT NULL,
    "notepad_text" TEXT,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "editors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editor_widgets" (
    "id" SERIAL NOT NULL,
    "widgetType" "WidgetType" NOT NULL,
    "top" INTEGER NOT NULL DEFAULT 0,
    "left" INTEGER NOT NULL DEFAULT 0,
    "editorId" INTEGER,

    CONSTRAINT "editor_widgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editor_badges" (
    "id" SERIAL NOT NULL,
    "top" INTEGER NOT NULL DEFAULT 0,
    "left" INTEGER NOT NULL DEFAULT 0,
    "badgeId" INTEGER NOT NULL,
    "editorId" INTEGER,

    CONSTRAINT "editor_badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_categories_title_key" ON "character_categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "mangas_id_key" ON "mangas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stories_id_key" ON "stories"("id");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_characterCategoryId_fkey" FOREIGN KEY ("characterCategoryId") REFERENCES "character_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_chapters" ADD CONSTRAINT "manga_chapters_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "mangas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_pages" ADD CONSTRAINT "manga_pages_mangaChapterId_fkey" FOREIGN KEY ("mangaChapterId") REFERENCES "manga_chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_pages" ADD CONSTRAINT "story_pages_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editors" ADD CONSTRAINT "editors_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editor_widgets" ADD CONSTRAINT "editor_widgets_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "editors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editor_badges" ADD CONSTRAINT "editor_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "awards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editor_badges" ADD CONSTRAINT "editor_badges_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "editors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
