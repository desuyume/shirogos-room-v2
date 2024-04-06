import { Module } from '@nestjs/common';
import { RoomGuideService } from './room-guide.service';
import { RoomGuideController } from './room-guide.controller';
import { PrismaService } from 'src/prisma.service';
import { CustomPrismaModule } from 'nestjs-prisma';
import { ExtendedPrismaConfigService } from 'src/extended-prisma-config.service';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
    }),
  ],
  controllers: [RoomGuideController],
  providers: [RoomGuideService, PrismaService],
})
export class RoomGuideModule {}
