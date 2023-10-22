-- CreateTable
CREATE TABLE "old_nicknames" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "old_nicknames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "old_nicknames_userId_key" ON "old_nicknames"("userId");

-- AddForeignKey
ALTER TABLE "old_nicknames" ADD CONSTRAINT "old_nicknames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
