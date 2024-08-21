/*
  Warnings:

  - You are about to drop the `AchievementsOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BackroundsOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BadgesOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Frame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FramesOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationsOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PanopticonsOnRooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UniqueRolesOnRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AchievementsOnRooms" DROP CONSTRAINT "AchievementsOnRooms_achievenentId_fkey";

-- DropForeignKey
ALTER TABLE "AchievementsOnRooms" DROP CONSTRAINT "AchievementsOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "BackroundsOnRooms" DROP CONSTRAINT "BackroundsOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "BadgesOnRooms" DROP CONSTRAINT "BadgesOnRooms_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "BadgesOnRooms" DROP CONSTRAINT "BadgesOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "FramesOnRooms" DROP CONSTRAINT "FramesOnRooms_frameId_fkey";

-- DropForeignKey
ALTER TABLE "FramesOnRooms" DROP CONSTRAINT "FramesOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationsOnUsers" DROP CONSTRAINT "NotificationsOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "PanopticonsOnRooms" DROP CONSTRAINT "PanopticonsOnRooms_panopticonId_fkey";

-- DropForeignKey
ALTER TABLE "PanopticonsOnRooms" DROP CONSTRAINT "PanopticonsOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TaskResponse" DROP CONSTRAINT "TaskResponse_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TaskResponse" DROP CONSTRAINT "TaskResponse_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UniqueRolesOnRooms" DROP CONSTRAINT "UniqueRolesOnRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UniqueRolesOnRooms" DROP CONSTRAINT "UniqueRolesOnRooms_uniqueRoleId_fkey";

-- DropForeignKey
ALTER TABLE "achievement_awards" DROP CONSTRAINT "achievement_awards_frameId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_frameId_fkey";

-- DropTable
DROP TABLE "AchievementsOnRooms";

-- DropTable
DROP TABLE "BackroundsOnRooms";

-- DropTable
DROP TABLE "BadgesOnRooms";

-- DropTable
DROP TABLE "Frame";

-- DropTable
DROP TABLE "FramesOnRooms";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "NotificationsOnUsers";

-- DropTable
DROP TABLE "PanopticonsOnRooms";

-- DropTable
DROP TABLE "TaskResponse";

-- DropTable
DROP TABLE "UniqueRolesOnRooms";

-- CreateTable
CREATE TABLE "backgrounds_on_rooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "backgroundId" INTEGER NOT NULL,

    CONSTRAINT "backgrounds_on_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panopticons_on_rooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "panopticonId" INTEGER NOT NULL,
    "buyed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyed_cost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "panopticons_on_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unique_roles_on_rooms" (
    "roomId" INTEGER NOT NULL,
    "uniqueRoleId" INTEGER NOT NULL,

    CONSTRAINT "unique_roles_on_rooms_pkey" PRIMARY KEY ("roomId","uniqueRoleId")
);

-- CreateTable
CREATE TABLE "badges_on_rooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,

    CONSTRAINT "badges_on_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frames" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT,
    "isForSale" BOOLEAN NOT NULL,

    CONSTRAINT "frames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frames_on_rooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "frameId" INTEGER NOT NULL,

    CONSTRAINT "frames_on_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements_on_rooms" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "achievenentId" INTEGER NOT NULL,

    CONSTRAINT "achievements_on_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_responses" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "status" "TaskResponseStatus" NOT NULL DEFAULT 'PENDING',
    "roomId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "task_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "img" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_on_users" (
    "id" SERIAL NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "notifications_on_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "frames"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backgrounds_on_rooms" ADD CONSTRAINT "backgrounds_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backgrounds_on_rooms" ADD CONSTRAINT "backgrounds_on_rooms_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "backgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panopticons_on_rooms" ADD CONSTRAINT "panopticons_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panopticons_on_rooms" ADD CONSTRAINT "panopticons_on_rooms_panopticonId_fkey" FOREIGN KEY ("panopticonId") REFERENCES "panopticons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unique_roles_on_rooms" ADD CONSTRAINT "unique_roles_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unique_roles_on_rooms" ADD CONSTRAINT "unique_roles_on_rooms_uniqueRoleId_fkey" FOREIGN KEY ("uniqueRoleId") REFERENCES "unique_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges_on_rooms" ADD CONSTRAINT "badges_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges_on_rooms" ADD CONSTRAINT "badges_on_rooms_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frames_on_rooms" ADD CONSTRAINT "frames_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frames_on_rooms" ADD CONSTRAINT "frames_on_rooms_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "frames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "frames"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements_on_rooms" ADD CONSTRAINT "achievements_on_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements_on_rooms" ADD CONSTRAINT "achievements_on_rooms_achievenentId_fkey" FOREIGN KEY ("achievenentId") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_responses" ADD CONSTRAINT "task_responses_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_responses" ADD CONSTRAINT "task_responses_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_on_users" ADD CONSTRAINT "notifications_on_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_on_users" ADD CONSTRAINT "notifications_on_users_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
