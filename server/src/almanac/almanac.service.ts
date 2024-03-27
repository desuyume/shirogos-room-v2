import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlmanacService {
  constructor(private prisma: PrismaService) {}

  async getCurrentBirthdays(date: string) {
    const currentDate = date.replace('.', '/');

    const users = await this.prisma.user.findMany({
      where: {
        birthday: {
          startsWith: currentDate,
        },
      },
      select: {
        id: true,
        username: true,
        birthday: true,
      },
    });

    return users;
  }
}
