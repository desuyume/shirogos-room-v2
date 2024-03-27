import { Module } from '@nestjs/common';
import { AlmanacService } from './almanac.service';
import { AlmanacController } from './almanac.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [AlmanacController],
  providers: [AlmanacService, PrismaService],
})
export class AlmanacModule {}
