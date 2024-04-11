import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePanopticonDto } from './dto/create-panopticon.dto';
import { isNumber } from 'class-validator';
import { removeFile } from 'src/utils/removeFile';

@Injectable()
export class PanopticonService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.panopticon.findMany();
  }

  async getUnique() {
    return await this.prisma.panopticon.findMany({
      where: {
        isForSale: false,
      },
    });
  }

  async create(
    dto: CreatePanopticonDto,
    img: Express.Multer.File | null,
    miniatureImg: Express.Multer.File | null,
  ) {
    if (!img) {
      throw new BadRequestException('img is required');
    }

    if (!isNumber(+dto.cost)) {
      throw new BadRequestException('cost must be number');
    }

    const isForSale = JSON.parse(dto.isForSale);

    return this.prisma.panopticon.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        cost: +dto.cost,
        img: img.filename,
        miniatureImg: miniatureImg ? miniatureImg.filename : null,
        isForSale,
      },
    });
  }

  async delete(id: number) {
    const panopticon = await this.prisma.panopticon.findUnique({
      where: {
        id,
      },
    });

    if (!panopticon) {
      throw new BadRequestException('panopticon not found');
    }

    await this.prisma.panopticonsOnRooms.deleteMany({
      where: {
        panopticonId: id,
      },
    });

    removeFile(panopticon.img);
    if (panopticon.miniatureImg) {
      removeFile(panopticon.miniatureImg);
    }

    return await this.prisma.panopticon.delete({
      where: {
        id,
      },
    });
  }
}
