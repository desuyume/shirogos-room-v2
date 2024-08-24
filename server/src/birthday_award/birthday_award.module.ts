import { Module } from '@nestjs/common';
import { BirthdayAwardService } from './birthday_award.service';
import { BirthdayAwardController } from './birthday_award.controller';
import { PrismaService } from 'src/prisma.service';
import { DateService } from 'src/date/date.service';
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [BirthdayAwardController],
  providers: [BirthdayAwardService, PrismaService, DateService, TokenService],
  exports: [BirthdayAwardService],
})
export class BirthdayAwardModule {}
