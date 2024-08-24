import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [MangaController],
  providers: [MangaService, PrismaService, TokenService],
})
export class MangaModule {}
