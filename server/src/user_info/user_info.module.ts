import { Module } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { UserInfoController } from './user_info.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, PrismaService, TokenService],
})
export class UserInfoModule {}
