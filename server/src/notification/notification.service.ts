import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateNotificationDto,
  IFetchedNotification,
} from './dto/create-notification.dto';
import { removeFile } from 'src/utils/removeFile';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getUserNotifications(userId: number) {
    const notifications = await this.prisma.notificationsOnUsers.findMany({
      where: {
        userId,
      },
      select: {
        isRead: true,
        Notification: {
          select: {
            id: true,
            text: true,
            img: true,
            date_created: true,
          },
        },
      },
      orderBy: {
        Notification: {
          date_created: 'desc',
        },
      },
    });

    const result: IFetchedNotification[] = [];

    for (const n of notifications) {
      result.push({
        ...n.Notification,
        isRead: n.isRead,
      });
    }

    return {
      unreadCount: result.filter((n) => !n.isRead).length,
      notifications: result,
    };
  }

  async create(dto: CreateNotificationDto, img: Express.Multer.File | null) {
    if (!dto.text) {
      throw new BadRequestException('text is required');
    }
    const notification = await this.prisma.notification.create({
      data: {
        text: dto.text,
        img: !!img ? img.filename : null,
      },
    });
    const usersId = JSON.parse(dto.usersId) as number[];

    for (const userId of usersId) {
      await this.prisma.notificationsOnUsers.create({
        data: {
          notificationId: notification.id,
          userId,
        },
      });
    }

    return notification;
  }

  async readNotification(userId: number, notificationId: number) {
    return await this.prisma.notificationsOnUsers.updateMany({
      where: {
        userId,
        notificationId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async removeExpiredNotifications() {
    const currentDate = new Date();
    const oneAndHalfMonthsAgo = new Date();
    oneAndHalfMonthsAgo.setMonth(currentDate.getMonth() - 1);
    oneAndHalfMonthsAgo.setDate(oneAndHalfMonthsAgo.getDate() - 15);

    const notifications = await this.prisma.notification.findMany({
      where: {
        date_created: {
          lt: oneAndHalfMonthsAgo,
        },
      },
    });

    for (const notification of notifications) {
      await this.prisma.notificationsOnUsers.deleteMany({
        where: {
          notificationId: notification.id,
        },
      });
      if (notification.img) {
        removeFile(notification.img);
      }
      await this.prisma.notification.delete({
        where: {
          id: notification.id,
        },
      });
    }

    return notifications;
  }
}
