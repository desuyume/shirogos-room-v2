import { Module } from '@nestjs/common';
import { ManualTaskService } from './manual-task.service';
import { ManualTaskController } from './manual-task.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [ManualTaskController],
  providers: [ManualTaskService, PrismaService, TokenService],
})
export class ManualTaskModule {}
