import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { UniqueRoleService } from 'src/unique-role/unique-role.service';
import { NotificationService } from 'src/notification/notification.service';
import { BirthdayAwardService } from 'src/birthday_award/birthday_award.service';
import { DateModule } from 'src/date/date.module';

@Module({
  providers: [
    TasksService,
    PrismaService,
    UniqueRoleService,
    NotificationService,
    BirthdayAwardService,
  ],
  imports: [DateModule],
})
export class TasksModule {}
