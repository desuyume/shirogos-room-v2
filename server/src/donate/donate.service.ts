import { Injectable } from '@nestjs/common';
import { CreateDonateDto } from './dto/donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DonateService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDonateDto) {
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

  async findAll() {
    return await this.prisma.donate.findMany({
      orderBy: [
        {
          username: 'asc',
        },
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} donate`;
  }

  update(id: number, updateDonateDto: UpdateDonateDto) {
    return `This action updates a #${id} donate`;
  }

  remove(id: number) {
    return `This action removes a #${id} donate`;
  }
}
