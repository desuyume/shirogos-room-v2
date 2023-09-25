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
    return await this.prisma.uniqueRole.delete({
      where: {
        id,
      },
    });
  }
}
