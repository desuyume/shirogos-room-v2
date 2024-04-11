import {
  BadRequestException,
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UniqueRoleService } from './unique-role.service';
import { CreateUniqueRoleDto } from './dto/create-unique-role.dto';
import { Prisma } from '@prisma/client';

@Controller('uniqueRole')
export class UniqueRoleController {
  constructor(private readonly uniqueRoleService: UniqueRoleService) {}

  @Get()
  async getAll(@Query('type') type) {
    try {
      if (type !== 'adjectives' && type !== 'nouns') {
        throw new BadRequestException('wrong roles type');
      }

      return await this.uniqueRoleService.getAll(type);
    } catch (e) {
      Catch(e);
    }
  }

  @Get('unique')
  async getUnique(@Query('type') type) {
    try {
      if (type !== 'adjectives' && type !== 'nouns') {
        throw new BadRequestException('wrong roles type');
      }

      return await this.uniqueRoleService.getUnique(type);
    } catch (e) {
      Catch(e);
    }
  }

  @Post()
  async create(@Query('type') type, @Body() dto: CreateUniqueRoleDto) {
    try {
      if (type !== 'adjectives' && type !== 'nouns') {
        throw new BadRequestException('wrong roles type');
      }

      const createdRole = await this.uniqueRoleService.create(dto, type);

      return createdRole;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new BadRequestException('role already exists');
        }
      }
      Catch(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.uniqueRoleService.remove(+id);
    } catch (e) {
      Catch(e);
    }
  }
}
