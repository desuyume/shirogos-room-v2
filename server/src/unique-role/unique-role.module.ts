import { Module } from '@nestjs/common';
import { UniqueRoleService } from './unique-role.service';
import { UniqueRoleController } from './unique-role.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UniqueRoleController],
  providers: [UniqueRoleService, PrismaService],
})
export class UniqueRoleModule {}
