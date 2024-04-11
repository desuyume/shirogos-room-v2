import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get('')
  async getAllBadges() {
    return await this.badgeService.getAllBadges();
  }

  @Get('type')
  async getBadgeTypes() {
    return await this.badgeService.getBadgeTypes();
  }

  @Post('')
  @UseInterceptors(FileInterceptor('badgeImg', multerOptions))
  async create(
    @Body() dto: CreateBadgeDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.badgeService.create(dto, img);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.badgeService.delete(+id);
  }
}
