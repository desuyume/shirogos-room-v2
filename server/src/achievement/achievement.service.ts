import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AchievementAwards, CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.achievement.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        background: true,
        AchievementsOnRooms: {
          select: {
            roomId: true,
          },
        },
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

    // await this.prisma.achievementAward.create({
    //   data: {
    //     badgeId: awards.badge,
    //     frameId: awards.frame,
    //     backgroundId: awards.background,
        
    //   }
    // })

    const roomsId = JSON.parse(dto.roomsId);

    for (const roomId of roomsId) {
      await this.prisma.achievementsOnRooms.create({
        data: {
          achievenentId: achievement.id,
          roomId: roomId,
        },
      });
    }

    return achievement;
  }
}
