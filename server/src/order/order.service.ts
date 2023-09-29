import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderPriceDto } from './dto/create-order-price.dto';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderPriceDto } from './dto/update-order-price.dto';
import { UpdateOrderRulesDto } from './dto/update-order-rules.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    const orderPrice = await this.prisma.orderPrice.findUnique({
      where: {
        id: dto.orderPriceId,
      },
    });

    if (user.dangos < orderPrice.cost) {
      throw new BadRequestException('not enough dango');
    }

    await this.prisma.user.update({
      where: {
        id: dto.userId,
      },
      data: {
        dangos: {
          decrement: orderPrice.cost,
        },
      },
    });

    return await this.prisma.order.create({
      data: {
        userId: dto.userId,
        orderTypeId: dto.orderTypeId,
        orderText: dto.orderText,
        orderPriceId: dto.orderPriceId,
      },
    });
  }

  async createOrderManually(dto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        userId: dto.userId,
        orderTypeId: dto.orderTypeId,
        orderText: dto.orderText,
        orderPriceId: dto.orderPriceId,
      },
    });
  }

  async completeOrder(id: number) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.COMPLETED,
      },
    });
  }

  async rejectOrder(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: order.userId,
      },
    });
    const orderPrice = await this.prisma.orderPrice.findUnique({
      where: {
        id: order.orderPriceId,
      },
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        dangos: {
          increment: orderPrice.cost,
        },
      },
    });

    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.REJECTED,
      },
    });
  }

  async getAllOrders() {
    const orders = [];
    const ordersFromDb = await this.prisma.order.findMany();

    for (const orderFromDb of ordersFromDb) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: orderFromDb.userId,
        },
      });
      const order = { ...orderFromDb, username: user.username };
      orders.push(order);
    }

    return orders;
  }

  async getPendingOrders() {
    const orders = [];
    const ordersFromDb = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.PENDING,
      },
    });

    for (const orderFromDb of ordersFromDb) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: orderFromDb.userId,
        },
      });
      const order = { ...orderFromDb, username: user.username };
      orders.push(order);
    }

    return orders;
  }

  async getCompletedOrders() {
    const orders = [];
    const ordersFromDb = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.COMPLETED,
      },
    });

    for (const orderFromDb of ordersFromDb) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: orderFromDb.userId,
        },
      });
      const order = { ...orderFromDb, username: user.username };
      orders.push(order);
    }

    return orders;
  }

  async getRejectedOrders() {
    const orders = [];
    const ordersFromDb = await this.prisma.order.findMany({
      where: {
        status: OrderStatus.REJECTED,
      },
    });

    for (const orderFromDb of ordersFromDb) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: orderFromDb.userId,
        },
      });
      const order = { ...orderFromDb, username: user.username };
      orders.push(order);
    }

    return orders;
  }

  async getOrderTypes() {
    return await this.prisma.orderType.findMany();
  }

  async createOrderType(dto: CreateOrderTypeDto) {
    return await this.prisma.orderType.create({
      data: {
        type: dto.type,
        orderRules: dto.orderRules,
      },
    });
  }

  async getOrderPrices() {
    return await this.prisma.orderPrice.findMany();
  }

  async createOrderPrice(dto: CreateOrderPriceDto) {
    const orderType = await this.prisma.orderType.findUnique({
      where: {
        type: dto.type,
      },
    });

    if (!orderType) {
      throw new BadRequestException('no such order type');
    }

    return await this.prisma.orderPrice.create({
      data: {
        orderTypeId: orderType.id,
        cost: dto.cost,
        text: dto.text,
      },
    });
  }

  async updateOrderPrice(id: number, dto: UpdateOrderPriceDto) {
    const orderPrice = await this.prisma.orderPrice.findUnique({
      where: {
        id,
      },
    });

    if (!orderPrice) {
      throw new BadRequestException('no such order price');
    }

    return await this.prisma.orderPrice.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async updateOrderRules(id: number, dto: UpdateOrderRulesDto) {
    const orderType = await this.prisma.orderType.findUnique({
      where: {
        id,
      },
    });

    if (!orderType) {
      throw new BadRequestException('no such order type');
    }

    return await this.prisma.orderType.update({
      where: {
        id,
      },
      data: {
        orderRules: dto.rules,
      },
    });
  }
}
