import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFrameDto } from './dto/create-frame.dto';
import { removeFile } from 'src/utils/removeFile';
import { isNumber } from 'src/utils/isNumber';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrameService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.frame.findMany();
  }

  async getUnique() {
    return await this.prisma.frame.findMany({
      where: {
        isForSale: false,
      },
    });
  }

  async create(dto: CreateFrameDto, img: Express.Multer.File) {
    if (!img) {
      throw new BadRequestException('img is required');
    }

    if (!isNumber(+dto.cost)) {
      throw new BadRequestException('cost must be number');
    }

    const isForSale = JSON.parse(dto.isForSale);

    return this.prisma.frame.create({
      data: {
        title: dto.title,
        cost: +dto.cost,
        img: img.filename,
        isForSale,
      },
    });
  }

  async delete(id: number) {
    const frame = await this.prisma.frame.findUnique({
      where: {
        id,
      },
    });

    if (!frame) {
      throw new BadRequestException('frame not found');
    }

    await this.prisma.framesOnRooms.deleteMany({
      where: {
        frameId: id,
      },
    });

    removeFile(frame.img);

    return await this.prisma.frame.delete({
      where: {
        id,
      },
    });
  }
}
