import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBgDto } from './dto/create-bg.dto';
import { isNumber } from 'class-validator';
import { removeFile } from 'src/utils/removeFile';

@Injectable()
export class BackgroundService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.background.findMany();
  }

  async getUnique() {
    return await this.prisma.background.findMany({
      where: {
        isForSale: false,
      },
    });
  }

  async create(dto: CreateBgDto, img: Express.Multer.File) {
    if (!img) {
      throw new BadRequestException('img is required');
    }

    if (!isNumber(+dto.cost)) {
      throw new BadRequestException('cost must be number');
    }

    const isForSale = JSON.parse(dto.isForSale);

    return this.prisma.background.create({
      data: {
        title: dto.title,
        cost: +dto.cost,
        img: img.filename,
        isForSale,
      },
    });
  }

  async delete(id: number) {
    const bg = await this.prisma.background.findUnique({
      where: {
        id,
      },
    });

    if (!bg) {
      throw new BadRequestException('background not found');
    }

    await this.prisma.backroundsOnRooms.deleteMany({
      where: {
        backgroundId: id,
      },
    });

    removeFile(bg.img);

    return await this.prisma.background.delete({
      where: {
        id,
      },
    });
  }
}
