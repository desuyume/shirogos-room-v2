import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [MangaController],
  providers: [MangaService, PrismaService],
})
export class MangaModule {}
