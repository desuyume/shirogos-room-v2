-- CreateTable
CREATE TABLE "achievements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "background" TEXT,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement_awards" (
    "id" SERIAL NOT NULL,
    "badgeId" INTEGER,
    "roomBackgorundId" INTEGER,
    "uniqueRoleId" INTEGER,
    "exp" INTEGER,

    CONSTRAINT "achievement_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementsOnRooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "achievenentId" INTEGER NOT NULL,

    CONSTRAINT "AchievementsOnRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "awards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_roomBackgorundId_fkey" FOREIGN KEY ("roomBackgorundId") REFERENCES "room_backgrounds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_uniqueRoleId_fkey" FOREIGN KEY ("uniqueRoleId") REFERENCES "unique_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnRooms" ADD CONSTRAINT "AchievementsOnRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnRooms" ADD CONSTRAINT "AchievementsOnRooms_achievenentId_fkey" FOREIGN KEY ("achievenentId") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
