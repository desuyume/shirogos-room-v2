-- CreateTable
CREATE TABLE "donates" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gifts" TEXT,

    CONSTRAINT "donates_pkey" PRIMARY KEY ("id")
);
