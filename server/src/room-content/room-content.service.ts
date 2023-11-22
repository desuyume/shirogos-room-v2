import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RoomContentService {
  constructor(private prisma: PrismaService) {}

  async getAll(type) {
    let items;
    switch (type) {
      case 'panopticon':
        items = await this.prisma.panopticon.findMany();
        break;
      case 'background':
        items = await this.prisma.roomBackground.findMany();
        break;
      default:
        throw new BadRequestException(`Wrong content type`);
    }
    return items;
  }

  async add(cost: number, img: Express.Multer.File, type) {
    switch (type) {
      case 'panopticon':
        return await this.prisma.panopticon.create({
          data: {
            cost,
            img: img.filename,
          },
        });
      case 'background':
        return await this.prisma.roomBackground.create({
          data: {
            cost,
            img: img.filename,
          },
        });
      default:
        throw new BadRequestException(`Wrong content type`);
    }
  }

  async remove(id: number, type) {
    let item;

    switch (type) {
      case 'panopticon':
        const usersWithPanopticon = await this.prisma.panopticonsOnRooms.findMany({
          where: {
            panopticonId: id,
          },
          select: {
            roomId: true,
          },
        })

        const rooms = await this.prisma.room.findMany({
          where: {
            id: {
              in: usersWithPanopticon.map(item => item.roomId),
            }
          }
        })

        await this.prisma.user.updateMany({
          where: {
            id: {
              in: rooms.map(item => item.userId)
            }
          },
          data: {
            panopticons: {
              decrement: 1
            }
          }
        })

        await this.prisma.panopticonsOnRooms.deleteMany({
          where: {
            panopticonId: id,
          },
        })

        item = await this.prisma.panopticon.delete({
          where: {
            id,
          },
        });
        break;
      case 'background':
        item = await this.prisma.roomBackground.delete({
          where: {
            id,
          },
        });
        break;
      default:
        throw new BadRequestException(`Wrong content type`);
    }

    if (fs.existsSync(path.join(__dirname, '..', '..', 'static', item.img))) {
      fs.unlinkSync(
        path.resolve(__dirname, '..', '..', 'static', item.img),
      );
    }

    return item;
  }
}
