import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBadgeDto, UpdateBadgeDto } from './dto/badge.dto';
import { removeFile } from 'src/utils/removeFile';
import { isNumber } from 'class-validator';

@Injectable()
export class BadgeService {
  constructor(private prisma: PrismaService) {}

  async getAllBadges() {
    return await this.prisma.badge.findMany({
      select: {
        id: true,
        cost: true,
        title: true,
        img: true,
        type: true,
        isForSale: true,
      },
    });
  }

  async getUniqueBadges() {
    return await this.prisma.badge.findMany({
      select: {
        id: true,
        cost: true,
        title: true,
        img: true,
        type: true,
        isForSale: true,
      },
      where: {
        isForSale: false,
      },
    });
  }

  async getBadgeTypes() {
    return await this.prisma.badgeType.findMany();
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

    return await this.prisma.badge.create({
      data: {
        cost: +dto.cost,
        title: dto.title,
        img: img.filename,
        typeId: badgeType.id,
        isForSale,
      },
    });
  }

  async update(id: number, dto: UpdateBadgeDto, img: Express.Multer.File) {
    const badge = await this.prisma.badge.findUnique({
      where: {
        id,
      },
    });

    if (!badge) {
      throw new NotFoundException('badge not found');
    }

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

    if (badge.img) {
      removeFile(badge.img);
    }

    return await this.prisma.badge.update({
      where: {
        id,
      },
      data: {
        cost: +dto.cost,
        title: dto.title,
        img: img.filename,
        typeId: badgeType.id,
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
    await this.prisma.editorBadge.deleteMany({
      where: {
        badgeId: id,
      },
    });

    removeFile(badge.img);

    return await this.prisma.badge.delete({
      where: {
        id,
      },
    });
  }
}
