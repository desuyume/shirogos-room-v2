/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `twitch_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "twitch_profiles_login_key" ON "twitch_profiles"("login");
