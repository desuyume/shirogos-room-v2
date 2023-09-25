import { Module } from '@nestjs/common';
import { RoomContentService } from './room-content.service';
import { RoomContentController } from './room-content.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [RoomContentController],
  providers: [RoomContentService, PrismaService]
})
export class RoomContentModule {}
