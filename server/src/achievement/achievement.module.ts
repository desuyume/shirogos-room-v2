import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { PrismaService } from 'nestjs-prisma';
import { UserStatsModule } from 'src/user_stats/user_stats.module';

@Module({
  controllers: [AchievementController],
  providers: [AchievementService, PrismaService],
  imports: [UserStatsModule],
})
export class AchievementModule {}
