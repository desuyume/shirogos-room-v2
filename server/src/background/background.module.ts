import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService, PrismaService, TokenService],
})
export class BackgroundModule {}
