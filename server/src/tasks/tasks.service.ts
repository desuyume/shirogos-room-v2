import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from 'src/notification/notification.service';
import { UniqueRoleService } from 'src/unique-role/unique-role.service';

@Injectable()
export class TasksService {
  constructor(
    private uniqueRoleService: UniqueRoleService,
    private notificationService: NotificationService,
  ) {
    this.randomizeUniqueRoles();
    this.removeExpiredNotifications();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'randomizeUniqueRoles',
    timeZone: 'Europe/Moscow',
  })
  async randomizeUniqueRoles() {
    await this.uniqueRoleService.setAllRandomUniqueRoles();
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'removeExpiredNotifications',
    timeZone: 'Europe/Moscow',
  })
  async removeExpiredNotifications() {
    await this.notificationService.removeExpiredNotifications();
  }
}
