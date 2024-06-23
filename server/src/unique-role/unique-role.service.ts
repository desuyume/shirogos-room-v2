import { Injectable } from '@nestjs/common';
import { UniqueRoleType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getRandomInt } from 'src/utils/getRandomInt';
import { CreateUniqueRoleDto } from './dto/create-unique-role.dto';

@Injectable()
export class UniqueRoleService {
  constructor(private prisma: PrismaService) {}

  async getAll(type) {
    return await this.prisma.uniqueRole.findMany({
      where: {
        type: type.toUpperCase(),
      },
    });
  }

  async getUnique(type) {
    return await this.prisma.uniqueRole.findMany({
      where: {
        type: type.toUpperCase(),
        isForSale: false,
      },
    });
  }

  async create(dto: CreateUniqueRoleDto, type: UniqueRoleType) {
    return await this.prisma.uniqueRole.create({
      data: {
        title: dto.title,
        cost: dto.cost,
        type:
          type === 'ADJECTIVES'
            ? UniqueRoleType.ADJECTIVES
            : UniqueRoleType.NOUNS,
        isForSale: dto.isForSale,
      },
    });
  }

  async remove(id: number) {
    const role = await this.prisma.uniqueRole.findUnique({
      where: {
        id,
      },
    });

    await this.prisma.uniqueRolesOnRooms.deleteMany({
      where: {
        uniqueRoleId: id,
      },
    });

    switch (role.type) {
      case UniqueRoleType.ADJECTIVES:
        await this.prisma.room.updateMany({
          where: {
            selected_unique_role_adjective: role.title,
          },
          data: {
            selected_unique_role_adjective: null,
          },
        });
        break;
      case UniqueRoleType.NOUNS:
        await this.prisma.room.updateMany({
          where: {
            selected_unique_role_noun: role.title,
          },
          data: {
            selected_unique_role_noun: null,
          },
        });
        break;
      default:
        throw new Error('wrong unique role type');
    }

    return await this.prisma.uniqueRole.delete({
      where: {
        id,
      },
    });
  }

  async setAllRandomUniqueRoles() {
    const rooms = await this.prisma.room.findMany();
    const adjectives = await this.prisma.uniqueRole.findMany({
      where: {
        type: UniqueRoleType.ADJECTIVES,
        isForSale: true,
      },
    });
    const nouns = await this.prisma.uniqueRole.findMany({
      where: {
        type: UniqueRoleType.NOUNS,
        isForSale: true,
      },
    });

    for (const room of rooms) {
      const randomAdjectiveNum = getRandomInt(0, adjectives.length - 1);
      const randomNounNum = getRandomInt(0, nouns.length - 1);

      await this.prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          random_unique_role_adjective: !!adjectives.length
            ? adjectives[randomAdjectiveNum].title
            : null,
          random_unique_role_noun: !!nouns.length
            ? nouns[randomNounNum].title
            : null,
        },
      });
    }
  }
}
