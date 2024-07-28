import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderPriceDto } from './dto/create-order-price.dto';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderPriceDto } from './dto/update-order-price.dto';
import { UpdateOrderRulesDto } from './dto/update-order-rules.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';
import { CreateOrderManuallyDto } from './dto/create-order-manually.dto';

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

  async createOrderManually(dto: CreateOrderManuallyDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
      select: {
        id: true,
      },
    });

    const orderPrice = await this.prisma.orderPrice.findUnique({
      where: {
        id: dto.orderPriceId,
      },
    });

    const orderType = await this.prisma.orderType.findUnique({
      where: {
        id: orderPrice.orderTypeId,
      },
    });

    switch (orderType.type) {
      case 'game':
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            games_ordered: {
              increment: 1,
            },
          },
        });
        break;

      case 'viewing':
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            viewing_ordered: {
              increment: 1,
            },
          },
        });
        break;

      default:
        throw new BadRequestException('invalid order type');
    }

    return await this.prisma.order.create({
      data: {
        userId: user.id,
        orderTypeId: orderPrice.orderTypeId,
        orderText: dto.orderText,
        orderPriceId: dto.orderPriceId,
        isByAdmin: true,
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
      include: {
        orderType: true,
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

    switch (order.orderType.type) {
      case 'game':
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            games_ordered: {
              decrement: 1,
            },
          },
        });
        break;

      case 'viewing':
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            viewing_ordered: {
              decrement: 1,
            },
          },
        });
        break;

      default:
        throw new BadRequestException('invalid order type');
    }

    if (!order.isByAdmin) {
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
    }

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
    return await this.prisma.order.findMany({
      select: {
        id: true,
        orderText: true,
        orderPrice: {
          select: {
            cost: true,
            text: true,
          },
        },
        orderType: {
          select: {
            type: true,
          },
        },
        status: true,
        user: {
          select: {
            username: true,
            twitch: {
              select: {
                displayName: true
              }
            }
          },
        },
      },
    });
  }

  async getPendingOrders() {
    return await this.prisma.order.findMany({
      where: {
        status: OrderStatus.PENDING,
      },
      select: {
        id: true,
        orderText: true,
        orderPrice: {
          select: {
            cost: true,
            text: true,
          },
        },
        orderType: {
          select: {
            type: true,
          },
        },
        status: true,
        user: {
          select: {
            username: true,
            twitch: {
              select: {
                displayName: true
              }
            }
          },
        },
      },
    });
  }

  async getCompletedOrders() {
    return await this.prisma.order.findMany({
      where: {
        status: OrderStatus.COMPLETED,
      },
      select: {
        id: true,
        orderText: true,
        orderPrice: {
          select: {
            cost: true,
            text: true,
          },
        },
        orderType: {
          select: {
            type: true,
          },
        },
        status: true,
        user: {
          select: {
            username: true,
            twitch: {
              select: {
                displayName: true
              }
            }
          },
        },
      },
    });
  }

  async getRejectedOrders() {
    return await this.prisma.order.findMany({
      where: {
        status: OrderStatus.REJECTED,
      },
      select: {
        id: true,
        orderText: true,
        orderPrice: {
          select: {
            cost: true,
            text: true,
          },
        },
        orderType: {
          select: {
            type: true,
          },
        },
        status: true,
        user: {
          select: {
            username: true,
            twitch: {
              select: {
                displayName: true
              }
            }
          },
        },
      },
    });
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
    return await this.prisma.orderPrice.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getOrdersByType(type: string) {
    const orderType = await this.prisma.orderType.findUnique({
      where: {
        type,
      },
    });

    if (!orderType) {
      throw new BadRequestException('no such order type');
    }

    const orderPrices = await this.prisma.orderPrice.findMany({
      where: {
        orderTypeId: orderType.id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const result = [];

    for (const price of orderPrices) {
      const orderType = await this.prisma.orderType.findUnique({
        where: {
          id: price.orderTypeId,
        },
      });
      result.push({
        id: price.id,
        type: orderType.type,
        cost: price.cost,
        text: price.text,
        rules: orderType.orderRules,
        priceId: price.id,
      });
    }

    return result;
  }

  async getOrderRulesByType(type: string) {
    const orderType = await this.prisma.orderType.findUnique({
      where: {
        type,
      },
    });

    if (!orderType) {
      throw new BadRequestException('no such order type');
    }

    return { rules: orderType.orderRules };
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

  async updateOrderRules(type: string, dto: UpdateOrderRulesDto) {
    const orderType = await this.prisma.orderType.findUnique({
      where: {
        type,
      },
    });

    if (!orderType) {
      throw new BadRequestException('no such order type');
    }

    return await this.prisma.orderType.update({
      where: {
        id: orderType.id,
      },
      data: {
        orderRules: dto.rules,
      },
    });
  }
}
