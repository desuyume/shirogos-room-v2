/*
  Warnings:

  - Added the required column `isForSale` to the `unique_roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "unique_roles" ADD COLUMN     "isForSale" BOOLEAN NOT NULL;
