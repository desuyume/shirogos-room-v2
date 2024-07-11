import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateBirthdayAwardDto } from './dto/update-birthday-award';
import * as moment from 'moment-timezone';
import { DateService } from 'src/date/date.service';

@Injectable()
export class BirthdayAwardService {
  constructor(
    private prisma: PrismaService,
    private dateService: DateService,
  ) {}
  private readonly moscowTimezone: string = 'Europe/Moscow';

  async getOne() {
    return await this.prisma.birthdayAward.findUnique({
      where: {
        id: 1,
      },
    });
  }

  async updateAward(dto: UpdateBirthdayAwardDto) {
    return await this.prisma.birthdayAward.upsert({
      where: {
        id: 1,
      },
      update: {
        id: 1,
        award: dto.award,
      },
      create: {
        id: 1,
        award: dto.award,
      },
    });
  }

  async giveBirthdayAwards() {
    const currentDateStr = this.dateService.getCurrentDateInMoscow();

    const users = await this.prisma.user.findMany({
      where: {
        birthday: currentDateStr,
      },
    });
    const birthdayAward = await this.prisma.birthdayAward.findFirst();

    if (!birthdayAward) {
      return;
    }

    for (const user of users) {
      // if user last received award not older than a year then dont give award
      if (
        user.lastRecievedBirthdayAwardDay &&
        !this.dateService.isDateOlderThanAYear(
          user.lastRecievedBirthdayAwardDay,
        )
      ) {
        return;
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          dangos: {
            increment: birthdayAward.award,
          },
          lastRecievedBirthdayAwardDay: currentDateStr,
        },
      });
    }
  }

  async giveBirthdayAwardToUser(userId: number) {
    const currentDateStr = this.dateService.getCurrentDateInMoscow();

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return;

    if (user.birthday !== currentDateStr) return;

    const birthdayAward = await this.prisma.birthdayAward.findFirst();
    if (!birthdayAward) return;

    // if user last received award not older than a year then dont give award
    if (
      user.lastRecievedBirthdayAwardDay &&
      !this.dateService.isDateOlderThanAYear(user.lastRecievedBirthdayAwardDay)
    ) {
      return;
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        dangos: {
          increment: birthdayAward.award,
        },
        lastRecievedBirthdayAwardDay: currentDateStr,
      },
    });
  }
}
