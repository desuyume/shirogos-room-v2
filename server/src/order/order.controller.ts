import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderPriceDto } from './dto/create-order-price.dto';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { Prisma } from '@prisma/client';
import { UpdateOrderPriceDto } from './dto/update-order-price.dto';
import { UpdateOrderRulesDto } from './dto/update-order-rules.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get('completed')
  async getCompletedOrders() {
    return await this.orderService.getPendingOrders();
  }

  @Get('pending')
  async getPendingOrders() {
    return await this.orderService.getPendingOrders();
  }

  @Get('rejected')
  async getRejectedOrders() {
    return await this.orderService.getRejectedOrders();
  }

  @Post('')
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Post('manually')
  async createOrderManually(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrderManually(dto);
  }

  @Patch('complete/:id')
  async completeOrder(@Param('id') id: string) {
    return await this.orderService.completeOrder(+id);
  }

  @Patch('reject/:id')
  async rejectOrder(@Param('id') id: string) {
    return await this.orderService.rejectOrder(+id);
  }

  @Get('type')
  async getOrderTypes() {
    return await this.orderService.getOrderTypes();
  }

  @Post('type')
  async createOrderType(@Body() dto: CreateOrderTypeDto) {
    try {
      return await this.orderService.createOrderType(dto);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new BadRequestException('this order type already exists');
        }
      }
      throw e;
    }
  }

  @Patch('type/rules/:id')
  async updateOrderRules(
    @Param('id') id: string,
    @Body() dto: UpdateOrderRulesDto,
  ) {
    return await this.orderService.updateOrderRules(+id, dto);
  }

  @Get('price')
  async getOrderPrices() {
    return await this.orderService.getOrderPrices();
  }

  @Get('info')
  async getOrdersByType(@Query('type') type) {
    return await this.orderService.getOrdersByType(type);
  }

  @Post('price')
  async createOrderPrice(@Body() dto: CreateOrderPriceDto) {
    return await this.orderService.createOrderPrice(dto);
  }

  @Patch('price/:id')
  async updateOrderPrice(
    @Param('id') id: string,
    @Body() dto: UpdateOrderPriceDto,
  ) {
    return await this.orderService.updateOrderPrice(+id, dto);
  }
}
