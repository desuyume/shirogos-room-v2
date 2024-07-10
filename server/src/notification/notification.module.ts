import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, TokenService],
})
export class NotificationModule {}
