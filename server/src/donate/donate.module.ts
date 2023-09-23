import { Module } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [DonateController],
  providers: [DonateService, PrismaService],
})
export class DonateModule {}
