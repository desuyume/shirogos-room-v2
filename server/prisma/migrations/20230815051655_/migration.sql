-- CreateEnum
CREATE TYPE "UniqueRoleType" AS ENUM ('ADJECTIVES', 'NOUNS');

-- CreateTable
CREATE TABLE "unique_roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "UniqueRoleType" NOT NULL,

    CONSTRAINT "unique_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_roles_title_key" ON "unique_roles"("title");
