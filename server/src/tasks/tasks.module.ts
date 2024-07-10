import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { UniqueRoleService } from 'src/unique-role/unique-role.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [
    TasksService,
    PrismaService,
    UniqueRoleService,
    NotificationService,
  ],
})
export class TasksModule {}
