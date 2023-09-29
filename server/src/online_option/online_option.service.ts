import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOnlineOptionDto } from './dto/create-online_option.dto';
import { getRandomInt } from 'src/utils/getRandomInt';

@Injectable()
export class OnlineOptionService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.onlineOption.findMany();
  }

  async getRandom() {
    const variations = await this.prisma.onlineOption.findMany();

    if (!variations.length) {
      return
    }

    const randomIndex = getRandomInt(0, variations.length-1);
    return variations[randomIndex];
  }

  async create(dto: CreateOnlineOptionDto) {
    return await this.prisma.onlineOption.create({
      data: {
        id: dto.id,
        title: dto.title,
      },
    });
  }

  async delete(id: number) {
    const variation = await this.prisma.onlineOption.findUnique({
      where: {
        id,
      },
    });

    if (!variation) {
      throw new BadRequestException('option not found');
    }

    return await this.prisma.onlineOption.delete({
      where: {
        id,
      },
    });
  }
}
