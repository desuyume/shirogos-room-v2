import { BadRequestException, Injectable } from '@nestjs/common';
import { DonateDto } from './dto/donate.dto';
import { PrismaService } from 'src/prisma.service';
import {
  UpdateAmountDonateDto,
  UpdateGiftsDonateDto,
} from './dto/update-donate.dto';
import { isNumber } from 'src/utils/isNumber';

@Injectable()
export class DonateService {
  constructor(private prisma: PrismaService) {}

  async create(dto: DonateDto) {
    const { username, amount, gifts } = dto;
    const donate = await this.prisma.donate.create({
      data: {
        username,
        amount,
        gifts,
      },
    });
    return donate;
  }

  async getAll() {
    return await this.prisma.donate.findMany({
      orderBy: [
        {
          username: 'asc',
        },
      ],
    });
  }

  async updateAmount(id: number, dto: UpdateAmountDonateDto) {
    if (!isNumber(dto.addAmount)) {
      throw new BadRequestException('add amount must be a number');
    }
    return await this.prisma.donate.update({
      where: {
        id,
      },
      data: {
        amount: {
          increment: +dto.addAmount,
        },
      },
    });
  }

  async updateGifts(id: number, dto: UpdateGiftsDonateDto) {
    return await this.prisma.donate.update({
      where: {
        id,
      },
      data: {
        gifts: dto.gifts,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.donate.delete({
      where: {
        id,
      },
    });
  }
}
