import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, TokenService]
})
export class RoomModule {}
