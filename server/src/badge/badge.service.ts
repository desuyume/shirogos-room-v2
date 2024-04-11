import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { removeFile } from 'src/utils/removeFile';
import { isNumber } from 'class-validator';

@Injectable()
export class BadgeService {
  constructor(private prisma: PrismaService) {}

  async getAllBadges() {
    return this.prisma.badge.findMany({
      select: {
        id: true,
        cost: true,
        title: true,
        badgeImg: true,
        type: true,
        isForSale: true,
      },
    });
  }

  async getBadgeTypes() {
    return this.prisma.badgeType.findMany();
  }

  async create(dto: CreateBadgeDto, img: Express.Multer.File) {
    if (!img) {
      throw new BadRequestException('img is required');
    }

    const badgeType = await this.prisma.badgeType.findUnique({
      where: {
        type: dto.type,
      },
    });

    if (!badgeType) {
      throw new BadRequestException('badge type not found');
    }

    if (!isNumber(+dto.cost)) {
      throw new BadRequestException('cost must be a number');
    }

    const isForSale = JSON.parse(dto.isForSale);

    return this.prisma.badge.create({
      data: {
        cost: +dto.cost,
        title: dto.title,
        badgeImg: img.filename,
        typeId: badgeType.id,
        isForSale,
      },
    });
  }

  async delete(id: number) {
    const badge = await this.prisma.badge.findUnique({
      where: {
        id,
      },
    });

    if (!badge) {
      throw new BadRequestException('badge not found');
    }

    await this.prisma.badgesOnRooms.deleteMany({
      where: {
        badgeId: id,
      },
    });

    removeFile(badge.badgeImg);

    return await this.prisma.badge.delete({
      where: {
        id,
      },
    });
  }
}
