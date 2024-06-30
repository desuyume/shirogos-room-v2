/*
  Warnings:

  - The values [ACCEPTED] on the enum `TaskResponseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskResponseStatus_new" AS ENUM ('REJECTED', 'PENDING');
ALTER TABLE "TaskResponse" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "TaskResponse" ALTER COLUMN "status" TYPE "TaskResponseStatus_new" USING ("status"::text::"TaskResponseStatus_new");
ALTER TYPE "TaskResponseStatus" RENAME TO "TaskResponseStatus_old";
ALTER TYPE "TaskResponseStatus_new" RENAME TO "TaskResponseStatus";
DROP TYPE "TaskResponseStatus_old";
ALTER TABLE "TaskResponse" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
