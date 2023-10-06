import { Module } from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { ChronicleController } from './chronicle.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChronicleController],
  providers: [ChronicleService, PrismaService],
})
export class ChronicleModule {}
