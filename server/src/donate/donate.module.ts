import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [DonateController],
  providers: [DonateService, PrismaService, TokenService],
})
export class DonateModule {}
