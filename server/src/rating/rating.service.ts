import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getThreeBestUsers() {
    return this.prisma.user.findMany({
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
      },
    });
  }
}
