import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  async getAll() {
    return await this.achievementService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('bgImg', multerOptions))
  async create(
    @Body() dto: CreateAchievementDto,
    @UploadedFile() bgImg: Express.Multer.File,
  ) {
    return await this.achievementService.create(dto, bgImg);
  }
}
