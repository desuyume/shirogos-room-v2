import { Module } from '@nestjs/common';
import { UserStatsService } from './user_stats.service';
import { UserStatsController } from './user_stats.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [UserStatsController],
  providers: [UserStatsService, PrismaService, TokenService],
  exports: [UserStatsService]
})
export class UserStatsModule {}
