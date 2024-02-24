-- DropForeignKey
ALTER TABLE "MangaPage" DROP CONSTRAINT "MangaPage_mangaChapterId_fkey";

-- AlterTable
ALTER TABLE "MangaPage" ALTER COLUMN "mangaChapterId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_img" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryPage" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "page_num" INTEGER NOT NULL,
    "storyId" TEXT,

    CONSTRAINT "StoryPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_id_key" ON "Story"("id");

-- AddForeignKey
ALTER TABLE "MangaPage" ADD CONSTRAINT "MangaPage_mangaChapterId_fkey" FOREIGN KEY ("mangaChapterId") REFERENCES "MangaChapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryPage" ADD CONSTRAINT "StoryPage_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;
