import { Module } from '@nestjs/common';
import { PanopticonService } from './panopticon.service';
import { PanopticonController } from './panopticon.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [PanopticonController],
  providers: [PanopticonService, PrismaService, TokenService],
})
export class PanopticonModule {}
