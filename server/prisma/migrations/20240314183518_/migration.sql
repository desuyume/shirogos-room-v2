/*
  Warnings:

  - You are about to drop the column `left` on the `editor_badges` table. All the data in the column will be lost.
  - You are about to drop the column `top` on the `editor_badges` table. All the data in the column will be lost.
  - You are about to drop the column `left` on the `editor_widgets` table. All the data in the column will be lost.
  - You are about to drop the column `top` on the `editor_widgets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "editor_badges" DROP COLUMN "left",
DROP COLUMN "top",
ADD COLUMN     "translateX" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "translateY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "zIndex" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "editor_widgets" DROP COLUMN "left",
DROP COLUMN "top",
ADD COLUMN     "translateX" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "translateY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "zIndex" INTEGER NOT NULL DEFAULT 1;
