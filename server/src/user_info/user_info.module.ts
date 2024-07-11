import { Module } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { UserInfoController } from './user_info.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service';
import { BirthdayAwardModule } from 'src/birthday_award/birthday_award.module';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, PrismaService, TokenService],
  imports: [BirthdayAwardModule],
})
export class UserInfoModule {}
