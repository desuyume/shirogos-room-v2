import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { UserStatsModule } from 'src/user_stats/user_stats.module';
import { TokenService } from 'src/token/token.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [AchievementController],
  providers: [AchievementService, PrismaService, TokenService],
  imports: [UserStatsModule],
})
export class AchievementModule {}
