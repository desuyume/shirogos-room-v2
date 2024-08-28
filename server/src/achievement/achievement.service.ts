import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AchievementAwards,
  CreateAchievementDto,
} from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import getArrayDifferences from 'src/utils/getArrayDifferences';
import { removeFile } from 'src/utils/removeFile';
import { UserStatsService } from 'src/user_stats/user_stats.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AchievementService {
  constructor(
    private prisma: PrismaService,
    private userStatsService: UserStatsService,
  ) {}

  async getAll() {
    return await this.prisma.achievement.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        background: true,
        AchievementAward: true,
        AchievementsOnRooms: {
          select: {
            roomId: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async create(dto: CreateAchievementDto, bgImg: Express.Multer.File) {
    if (!bgImg) {
      throw new BadRequestException('backround image is required');
    }

    const achievement = await this.prisma.achievement.create({
      data: {
        title: dto.title,
        description: dto.description,
        background: bgImg.filename,
      },
    });

    const awards = JSON.parse(dto.awards) as AchievementAwards;

    await this.prisma.achievementAward.create({
      data: {
        achievementId: achievement.id,
        badgeId: awards.badge,
        frameId: awards.frame,
        backgroundId: awards.background,
        panopticonId: awards.panopticon,
        adjectiveId: awards.roles?.adjective ?? null,
        nounId: awards.roles?.noun ?? null,
        exp: awards.exp,
      },
    });

    const roomsId = JSON.parse(dto.roomsId) as number[];
    await this.giveAwards(achievement.id, roomsId, awards);

    return achievement;
  }

  async update(
    id: number,
    dto: UpdateAchievementDto,
    bgImg: Express.Multer.File,
  ) {
    if (!bgImg) {
      throw new BadRequestException('backround image is required');
    }

    const achievement = await this.prisma.achievement.findUnique({
      where: {
        id,
      },
      include: {
        AchievementsOnRooms: true,
        AchievementAward: true,
      },
    });

    if (!achievement) {
      throw new BadRequestException('Achievement not found');
    }

    const oldRoomsId = achievement.AchievementsOnRooms.map(
      (room) => room.roomId,
    );
    const newRoomsId = JSON.parse(dto.roomsId);
    const { addedItems: addedRoomsId, deletedItems: deletedRoomsId } =
      getArrayDifferences(oldRoomsId, newRoomsId);

    const awards: AchievementAwards = {
      badge: achievement.AchievementAward?.badgeId ?? null,
      frame: achievement.AchievementAward?.frameId ?? null,
      background: achievement.AchievementAward?.backgroundId ?? null,
      panopticon: achievement.AchievementAward?.panopticonId ?? null,
      roles:
        !achievement.AchievementAward?.adjectiveId &&
        !achievement.AchievementAward?.nounId
          ? null
          : {
              adjective: achievement.AchievementAward.adjectiveId,
              noun: achievement.AchievementAward.nounId,
            },
      exp: achievement.AchievementAward?.exp ?? 0,
    };

    await this.giveAwards(achievement.id, addedRoomsId, awards);
    await this.removeAwards(achievement.id, deletedRoomsId, awards);

    removeFile(achievement.background);

    return await this.prisma.achievement.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        background: bgImg.filename,
      },
    });
  }

  async remove(id: number) {
    const achievement = await this.prisma.achievement.findUnique({
      where: {
        id,
      },
      include: {
        AchievementsOnRooms: true,
        AchievementAward: true,
      },
    });

    if (!achievement) {
      throw new BadRequestException('Achievement not found');
    }

    const awards: AchievementAwards = {
      badge: achievement.AchievementAward?.badgeId ?? null,
      frame: achievement.AchievementAward?.frameId ?? null,
      background: achievement.AchievementAward?.backgroundId ?? null,
      panopticon: achievement.AchievementAward?.panopticonId ?? null,
      roles:
        !achievement.AchievementAward?.adjectiveId &&
        !achievement.AchievementAward?.nounId
          ? null
          : {
              adjective: achievement.AchievementAward.adjectiveId,
              noun: achievement.AchievementAward.nounId,
            },
      exp: achievement.AchievementAward?.exp ?? 0,
    };

    const roomsId = achievement.AchievementsOnRooms.map((room) => room.roomId);
    await this.removeAwards(achievement.id, roomsId, awards);

    removeFile(achievement.background);

    await this.prisma.achievementAward.deleteMany({
      where: {
        achievementId: id,
      },
    });

    await this.prisma.achievementsOnRooms.deleteMany({
      where: {
        achievenentId: id,
      },
    });

    return await this.prisma.achievement.delete({
      where: {
        id,
      },
    });
  }

  async getByTwitchLogin(twitchLogin: string) {
    const twitchProfile = await this.prisma.twitchProfile.findUnique({
      where: {
        login: twitchLogin,
      },
      select: {
        id: true,
      },
    });
    if (!twitchProfile) {
      throw new BadRequestException('User not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        twitchId: twitchProfile.id,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.prisma.achievement.findMany({
      where: {
        AchievementsOnRooms: {
          some: {
            Room: {
              userId: user.id,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        background: true,
      },
    });
  }

  async giveAwards(
    achievementId: number,
    roomsId: number[],
    awards: AchievementAwards,
  ) {
    for (const roomId of roomsId) {
      await this.prisma.achievementsOnRooms.create({
        data: {
          achievenentId: achievementId,
          roomId: roomId,
        },
      });

      if (awards.badge) {
        await this.prisma.badgesOnRooms.create({
          data: {
            badgeId: awards.badge,
            roomId: roomId,
          },
        });
      }

      if (awards.frame) {
        await this.prisma.framesOnRooms.create({
          data: {
            frameId: awards.frame,
            roomId: roomId,
          },
        });
      }

      if (awards.background) {
        await this.prisma.backroundsOnRooms.create({
          data: {
            backgroundId: awards.background,
            roomId: roomId,
          },
        });
      }

      if (awards.panopticon) {
        await this.prisma.panopticonsOnRooms.create({
          data: {
            panopticonId: awards.panopticon,
            roomId: roomId,
          },
        });
        await this.prisma.user.updateMany({
          where: {
            Room: {
              id: roomId,
            },
          },
          data: {
            panopticons: {
              increment: 1,
            },
          },
        });
      }

      if (awards.roles) {
        if (awards.roles.adjective) {
          await this.prisma.uniqueRolesOnRooms.create({
            data: {
              uniqueRoleId: awards.roles.adjective,
              roomId: roomId,
            },
          });
        }

        if (awards.roles.noun) {
          await this.prisma.uniqueRolesOnRooms.create({
            data: {
              uniqueRoleId: awards.roles.noun,
              roomId: roomId,
            },
          });
        }
      }

      if (awards.exp) {
        const room = await this.prisma.room.findUnique({
          where: {
            id: roomId,
          },
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        });
        await this.userStatsService.changeUserExperience(
          room.user.id,
          awards.exp,
        );
      }
    }
  }

  async removeAwards(
    achievementId: number,
    roomsId: number[],
    awards: AchievementAwards,
  ) {
    const roleTitles: { adjective: string | null; noun: string | null } = {
      adjective: null,
      noun: null,
    };

    if (awards.roles) {
      if (awards.roles.adjective) {
        const role = await this.prisma.uniqueRole.findUnique({
          where: {
            id: awards.roles.adjective,
          },
          select: {
            title: true,
          },
        });
        if (role) {
          roleTitles.adjective = role.title;
        }
      }
      if (awards.roles.noun) {
        const role = await this.prisma.uniqueRole.findUnique({
          where: {
            id: awards.roles.noun,
          },
          select: {
            title: true,
          },
        });
        if (role) {
          roleTitles.noun = role.title;
        }
      }
    }

    for (const roomId of roomsId) {
      await this.prisma.achievementsOnRooms.deleteMany({
        where: {
          achievenentId: achievementId,
          roomId: roomId,
        },
      });

      if (awards.badge) {
        await this.prisma.editorBadge.deleteMany({
          where: {
            badgeId: awards.badge,
            Editor: {
              roomId: roomId,
            },
          },
        });
        await this.prisma.badgesOnRooms.deleteMany({
          where: {
            badgeId: awards.badge,
            roomId: roomId,
          },
        });
      }

      if (awards.frame) {
        await this.prisma.room.updateMany({
          where: {
            id: roomId,
            frameId: awards.frame,
          },
          data: {
            frameId: null,
          },
        });
        await this.prisma.framesOnRooms.deleteMany({
          where: {
            frameId: awards.frame,
            roomId: roomId,
          },
        });
      }

      if (awards.background) {
        await this.prisma.room.updateMany({
          where: {
            id: roomId,
            backgroundId: awards.background,
          },
          data: {
            backgroundId: null,
          },
        });
        await this.prisma.backroundsOnRooms.deleteMany({
          where: {
            backgroundId: awards.background,
            roomId,
          },
        });
      }

      if (awards.panopticon) {
        await this.prisma.user.updateMany({
          where: {
            Room: {
              id: roomId,
            },
          },
          data: {
            panopticons: {
              decrement: 1,
            },
          },
        });
        await this.prisma.panopticonsOnRooms.deleteMany({
          where: {
            panopticonId: awards.panopticon,
            roomId: roomId,
          },
        });
      }

      if (awards.roles) {
        if (awards.roles.adjective) {
          await this.prisma.room.updateMany({
            where: {
              id: roomId,
              selected_unique_role_adjective: roleTitles.adjective,
            },
            data: {
              selected_unique_role_adjective: null,
            },
          });
          await this.prisma.uniqueRolesOnRooms.deleteMany({
            where: {
              uniqueRoleId: awards.roles.adjective,
              roomId: roomId,
            },
          });
        }

        if (awards.roles.noun) {
          await this.prisma.room.updateMany({
            where: {
              id: roomId,
              selected_unique_role_noun: roleTitles.noun,
            },
            data: {
              selected_unique_role_noun: null,
            },
          });
          await this.prisma.uniqueRolesOnRooms.deleteMany({
            where: {
              uniqueRoleId: awards.roles.noun,
              roomId: roomId,
            },
          });
        }
      }

      if (awards.exp) {
        const room = await this.prisma.room.findUnique({
          where: {
            id: roomId,
          },
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        });
        await this.userStatsService.decrementUserExperience(
          room.user.id,
          -awards.exp,
        );
      }
    }
  }
}
