import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [BadgeController],
  providers: [BadgeService, PrismaService, TokenService],
})
export class BadgeModule {}
