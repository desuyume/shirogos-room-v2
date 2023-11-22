import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service'
import { UniqueRoleService } from 'src/unique-role/unique-role.service'

@Module({
  providers: [TasksService, PrismaService, UniqueRoleService],
})
export class TasksModule {}
