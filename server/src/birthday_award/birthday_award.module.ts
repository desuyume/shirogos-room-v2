import { Module } from '@nestjs/common';
import { BirthdayAwardService } from './birthday_award.service';
import { BirthdayAwardController } from './birthday_award.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [BirthdayAwardController],
  providers: [BirthdayAwardService, PrismaService],
})
export class BirthdayAwardModule {}
