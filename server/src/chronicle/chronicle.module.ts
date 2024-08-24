import { Module } from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { ChronicleController } from './chronicle.controller';
import { PrismaService } from '../prisma.service';
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [ChronicleController],
  providers: [ChronicleService, PrismaService, TokenService],
})
export class ChronicleModule {}
