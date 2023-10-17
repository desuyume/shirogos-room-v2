import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenModule } from 'src/token/token.module'
import { TwitchStrategy } from './strategies/twitch.strategy'
import { RoomService } from 'src/room/room.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TwitchStrategy, RoomService],
  imports: [TokenModule]
})
export class AuthModule {}
