import { Injectable } from '@nestjs/common';
import { UniqueRoleType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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

  async create(title: string, type) {
    return await this.prisma.uniqueRole.create({
      data: {
        title,
        type:
          type === 'adjectives'
            ? UniqueRoleType.ADJECTIVES
            : UniqueRoleType.NOUNS,
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
}
