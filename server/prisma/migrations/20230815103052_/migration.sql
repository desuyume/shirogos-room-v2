-- CreateTable
CREATE TABLE "panopticons" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,

    CONSTRAINT "panopticons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_backgrounds" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,

    CONSTRAINT "room_backgrounds_pkey" PRIMARY KEY ("id")
);
