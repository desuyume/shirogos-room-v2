import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getThreeBestUsers() {
    const users = await this.prisma.user.findMany({
      take: 3,
      orderBy: [
        {
          level: 'desc',
        },
        {
          exp: 'desc',
        },
      ],
      select: {
        id: true,
        username: true,
        level: true,
        profile_img: true,
        miniature_img: true,
        Room: {
          select: {
            selected_frame: true,
          },
        },
      },
    });

    return users.map((user) => ({
      ...user,
      frame: user.Room?.selected_frame,
    }));
  }
}
