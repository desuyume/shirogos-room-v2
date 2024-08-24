import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('')
  async getAllBadges() {
    return await this.badgeService.getAllBadges();
  }

  @Get('unique')
  async getUniqueBadges() {
    return await this.badgeService.getUniqueBadges();
  }

  @Get('type')
  async getBadgeTypes() {
    return await this.badgeService.getBadgeTypes();
  }

  @UseGuards(AdminGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('badgeImg', multerOptions))
  async create(
    @Body() dto: CreateBadgeDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.badgeService.create(dto, img);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.badgeService.delete(+id);
  }
}
