import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderPriceDto } from './dto/create-order-price.dto';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { Prisma } from '@prisma/client';
import { UpdateOrderPriceDto } from './dto/update-order-price.dto';
import { UpdateOrderRulesDto } from './dto/update-order-rules.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderManuallyDto } from './dto/create-order-manually.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Get('completed')
  async getCompletedOrders() {
    return await this.orderService.getCompletedOrders();
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
  async createOrderManually(@Body() dto: CreateOrderManuallyDto) {
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

  @Put('rules/:type')
  async updateOrderRules(
    @Param('type') type: string,
    @Body() dto: UpdateOrderRulesDto,
  ) {
    return await this.orderService.updateOrderRules(type, dto);
  }

  @Get('price')
  async getOrderPrices() {
    return await this.orderService.getOrderPrices();
  }

  @Get('info')
  async getOrdersByType(@Query('type') type) {
    return await this.orderService.getOrdersByType(type);
  }

  @Get('rules')
  async getOrderRulesByType(@Query('type') type) {
    return await this.orderService.getOrderRulesByType(type);
  }

  @Post('price')
  async createOrderPrice(@Body() dto: CreateOrderPriceDto) {
    return await this.orderService.createOrderPrice(dto);
  }

  @Put('price/:id')
  async updateOrderPrice(
    @Param('id') id: string,
    @Body() dto: UpdateOrderPriceDto,
  ) {
    return await this.orderService.updateOrderPrice(+id, dto);
  }
}
