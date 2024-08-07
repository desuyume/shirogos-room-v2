import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService, PrismaService],
})
export class BackgroundModule {}
