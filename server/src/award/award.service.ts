import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { removeFile } from 'src/utils/removeFile';

@Injectable()
export class AwardService {
  constructor(private prisma: PrismaService) {}

  async getAllAwards() {
    return this.prisma.award.findMany({
      select: {
        id: true,
        cost: true,
        title: true,
        award_img: true,
        category: true,
        awardType: true,
      },
    });
  }

  async getAwardTypes() {
    return this.prisma.awardType.findMany();
  }

  async createAward(dto: CreateAwardDto, img: Express.Multer.File) {
    if (!img) {
      throw new BadRequestException('img is required');
    }

    const awardType = await this.prisma.awardType.findUnique({
      where: {
        type: dto.awardType,
      },
    });

    return this.prisma.award.create({
      data: {
        cost: +dto.cost,
        title: dto.title,
        award_img: img.filename,
        category: dto.category,
        awardTypeId: awardType.id,
      },
    });
  }

  async deleteAward(id: number) {
    const award = await this.prisma.award.findUnique({
      where: {
        id,
      },
    });

    if (!award) {
      throw new BadRequestException('award not found');
    }

    await this.prisma.awardsOnRooms.deleteMany({
      where: {
        awardId: id,
      },
    });

    removeFile(award.award_img);

    return await this.prisma.award.delete({
      where: {
        id,
      },
    });
  }
}
