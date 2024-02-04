-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaChapter" (
    "id" SERIAL NOT NULL,
    "chapter" INTEGER NOT NULL,
    "mangaId" TEXT NOT NULL,

    CONSTRAINT "MangaChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaPage" (
    "id" SERIAL NOT NULL,
    "page_number" INTEGER NOT NULL,
    "page_img" TEXT NOT NULL,
    "mangaChapterId" INTEGER NOT NULL,

    CONSTRAINT "MangaPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_id_key" ON "Manga"("id");

-- AddForeignKey
ALTER TABLE "MangaChapter" ADD CONSTRAINT "MangaChapter_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaPage" ADD CONSTRAINT "MangaPage_mangaChapterId_fkey" FOREIGN KEY ("mangaChapterId") REFERENCES "MangaChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
