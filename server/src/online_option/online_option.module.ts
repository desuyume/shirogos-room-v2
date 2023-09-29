import { Module } from '@nestjs/common';
import { OnlineOptionService } from './online_option.service';
import { OnlineOptionController } from './online_option.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OnlineOptionController],
  providers: [OnlineOptionService, PrismaService],
})
export class OnlineOptionModule {}
