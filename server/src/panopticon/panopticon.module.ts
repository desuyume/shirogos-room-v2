import { Module } from '@nestjs/common';
import { PanopticonService } from './panopticon.service';
import { PanopticonController } from './panopticon.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [PanopticonController],
  providers: [PanopticonService, PrismaService],
})
export class PanopticonModule {}
