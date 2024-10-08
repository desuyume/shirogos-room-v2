import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service'
import { TokenService } from 'src/token/token.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, TokenService],
})
export class OrderModule {}
