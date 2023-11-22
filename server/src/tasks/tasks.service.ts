import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UniqueRoleService } from 'src/unique-role/unique-role.service'

@Injectable()
export class TasksService {
  constructor(private uniqueRoleService: UniqueRoleService) {
    this.randomizeUniqueRoles();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'randomizeUniqueRoles',
    timeZone: 'Europe/Moscow',
  })
  async randomizeUniqueRoles() {
    await this.uniqueRoleService.setAllRandomUniqueRoles()
  }
}
