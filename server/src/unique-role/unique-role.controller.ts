import {
  BadRequestException,
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UniqueRoleService } from './unique-role.service';
import {
  CreateUniqueRoleDto,
  UpdateUniqueRoleDto,
} from './dto/unique-role.dto';
import { Prisma, UniqueRoleType } from '@prisma/client';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('uniqueRole')
export class UniqueRoleController {
  constructor(private readonly uniqueRoleService: UniqueRoleService) {}

  @Get()
  async getAll(@Query('type') type: UniqueRoleType) {
    try {
      if (type !== 'ADJECTIVES' && type !== 'NOUNS') {
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
      if (type !== 'ADJECTIVES' && type !== 'NOUNS') {
        throw new BadRequestException('wrong roles type');
      }

      return await this.uniqueRoleService.getUnique(type);
    } catch (e) {
      Catch(e);
    }
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Query('type') type: UniqueRoleType,
    @Body() dto: CreateUniqueRoleDto,
  ) {
    try {
      if (type !== 'ADJECTIVES' && type !== 'NOUNS') {
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

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(@Body() dto: UpdateUniqueRoleDto, @Param('id') id: number) {
    return await this.uniqueRoleService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.uniqueRoleService.remove(+id);
    } catch (e) {
      Catch(e);
    }
  }
}
