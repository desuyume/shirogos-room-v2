import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlmanacService {
  constructor(private prisma: PrismaService) {}

  async getCurrentBirthdays(date: string) {
    const [month, day] = date.split('.');
    const birthdayPattern = `${month}/${day}/`;

    const users = await this.prisma.user.findMany({
      where: {
        birthday: {
          startsWith: birthdayPattern,
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
