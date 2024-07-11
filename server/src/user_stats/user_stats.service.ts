import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddUserStatsDto } from './dto/add-user-stats.dto';

@Injectable()
export class UserStatsService {
  constructor(private prisma: PrismaService) {}

  async getUserStats(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        panopticons: true,
        games_ordered: true,
        viewing_ordered: true,
        dangos: true,
        level: true,
        exp: true,
        clips: true,
        legendary_exams: true,
        fraction_tournaments: true,
      },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    return user;
  }

  async addStats(id: number, type: string, dto: AddUserStatsDto) {
    switch (type) {
      case 'panopticons':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            panopticons: {
              increment: dto.value,
            },
          },
        });

      case 'games':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            games_ordered: {
              increment: dto.value,
            },
          },
        });

      case 'viewings':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            viewing_ordered: {
              increment: dto.value,
            },
          },
        });

      case 'dangos':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            dangos: {
              increment: dto.value,
            },
          },
        });

      case 'level':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            level: {
              increment: dto.value,
            },
          },
        });

      case 'exp':
        return await this.changeUserExperience(id, dto.value);
      case 'clips':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            clips: {
              increment: dto.value,
            },
          },
        });

      case 'exams':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            legendary_exams: {
              increment: dto.value,
            },
          },
        });

      case 'fractions':
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            fraction_tournaments: {
              increment: dto.value,
            },
          },
        });

      default:
        throw new BadRequestException('invalid type');
    }
  }

  async changeUserExperience(userId: number, exp: number) {
    if (exp < 0) {
      return await this.decrementUserExperience(userId, exp);
    } else {
      return await this.incrementUserExperience(userId, exp);
    }
  }

  async incrementUserExperience(userId: number, exp: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    let newExp = user.exp + exp;
    let newLevel = user.level;

    while (newExp >= 100) {
      newExp -= 100;
      newLevel++;
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        exp: newExp,
        level: newLevel,
      },
    });
  }

  async decrementUserExperience(userId: number, exp: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    let newExp = user.exp + exp;
    let newLevel = user.level;

    while (newExp < 0) {
      newExp += 100;
      newLevel--;
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        exp: newExp,
        level: newLevel,
      },
    });
  }
}
