import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { CreateChronicleEventDto } from './dto/create-chronicle-event.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ChronicleService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.chronicle.findMany({
      orderBy: [
        {
          year: 'asc',
        },
        {
          month: 'asc',
        },
      ],
    });
  }

  async getOne(skip: number) {
    const chronicles = await this.prisma.chronicle.findMany({
      skip,
      take: 1,
      include: {
        events: {
          orderBy: {
            day: 'asc',
          }
        }
      },
      orderBy: [
        {
          year: 'asc',
        },
        {
          month: 'asc',
        },
      ],
    });

    if (!chronicles || !chronicles.length) {
      return;
    }

    return chronicles[0];
  }

  async getCount() {
    const count = await this.prisma.chronicle.count();
    return { count };
  }

  async create(dto: CreateChronicleDto) {
    const chronicle = await this.prisma.chronicle.findFirst({
      where: {
        month: dto.month,
        year: dto.year,
      },
    });

    if (chronicle) {
      throw new BadRequestException('chronicle already exists');
    }

    return await this.prisma.chronicle.create({
      data: {
        year: dto.year,
        month: dto.month,
      },
    });
  }

  async delete(id: number) {
    const events = await this.prisma.chronicleEvent.findMany({
      where: {
        chronicleId: id,
      },
    });

    for (const event of events) {
      if (event.img) {
        if (
          fs.existsSync(path.join(__dirname, '..', '..', 'static', event.img))
        ) {
          fs.unlinkSync(
            path.resolve(__dirname, '..', '..', 'static', event.img),
          );
        }
      }
      await this.prisma.chronicleEvent.delete({
        where: {
          id: event.id,
        },
      });
    }

    return await this.prisma.chronicle.delete({
      where: {
        id,
      },
    });
  }

  async getChroincle(id: number) {
    const chronicle = await this.prisma.chronicle.findUnique({
      where: {
        id,
      },
    });

    if (!chronicle) {
      throw new BadRequestException('chronicle not found');
    }

    return await this.prisma.chronicle.findUnique({
      where: {
        id,
      },
      include: {
        events: {
          orderBy: {
            day: 'asc',
          },
        }
      },
    });
  }

  async createEvent(
    id: number,
    dto: CreateChronicleEventDto,
    img: Express.Multer.File,
  ) {
    const chronicle = await this.prisma.chronicle.findUnique({
      where: {
        id,
      },
    });

    if (!chronicle) {
      throw new BadRequestException('chronicle not found');
    }

    const event = await this.prisma.chronicleEvent.findFirst({
      where: {
        chronicleId: id,
        day: +dto.day,
        prefix: dto.prefix,
      },
    });

    if (event) {
      if (img) {
        if (
          fs.existsSync(
            path.join(__dirname, '..', '..', 'static', img.filename),
          )
        ) {
          fs.unlinkSync(
            path.resolve(__dirname, '..', '..', 'static', img.filename),
          );
        }
      }
      throw new BadRequestException('event already exists');
    }

    return await this.prisma.chronicleEvent.create({
      data: {
        chronicleId: id,
        day: +dto.day,
        prefix: dto.prefix,
        text: dto.text,
        img: img ? img.filename : null,
      },
    });
  }

  async deleteEvent(id: number) {
    const event = await this.prisma.chronicleEvent.findUnique({
      where: {
        id,
      },
    });

    if (event.img) {
      if (
        fs.existsSync(path.join(__dirname, '..', '..', 'static', event.img))
      ) {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'static', event.img));
      }
    }

    return await this.prisma.chronicleEvent.delete({
      where: {
        id,
      },
    });
  }
}
