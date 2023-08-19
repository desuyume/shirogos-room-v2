/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vkId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegramId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "discordId" INTEGER,
ADD COLUMN     "telegramId" INTEGER,
ADD COLUMN     "vkId" INTEGER;

-- CreateTable
CREATE TABLE "discord_profiles" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "discord_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vk_profiles" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "vk_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_profiles" (
    "id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_img" TEXT,

    CONSTRAINT "telegram_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_key" ON "users"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "users_vkId_key" ON "users"("vkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "discord_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_vkId_fkey" FOREIGN KEY ("vkId") REFERENCES "vk_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "telegram_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
