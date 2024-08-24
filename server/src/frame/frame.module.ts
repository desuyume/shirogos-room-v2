import { Module } from '@nestjs/common';
import { FrameService } from './frame.service';
import { FrameController } from './frame.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [FrameController],
  providers: [FrameService, PrismaService, TokenService],
})
export class FrameModule {}
