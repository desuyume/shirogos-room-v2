-- AlterTable
ALTER TABLE "achievement_awards" ADD COLUMN     "frameId" INTEGER,
ADD COLUMN     "panopticonId" INTEGER;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "Frame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement_awards" ADD CONSTRAINT "achievement_awards_panopticonId_fkey" FOREIGN KEY ("panopticonId") REFERENCES "panopticons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
