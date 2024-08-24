import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [StoryController],
  providers: [StoryService, PrismaService, TokenService],
})
export class StoryModule {}
