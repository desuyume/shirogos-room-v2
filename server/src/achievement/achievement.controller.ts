import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('all')
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

  @Put(':id')
  @UseInterceptors(FileInterceptor('bgImg', multerOptions))
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAchievementDto,
    @UploadedFile() bgImg: Express.Multer.File,
  ) {
    return await this.achievementService.update(id, dto, bgImg);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.achievementService.remove(id);
  }

  @Get(':twitchLogin')
  async getByTwitchLogin(@Param('twitchLogin') twitchLogin: string) {
    return await this.achievementService.getByTwitchLogin(twitchLogin);
  }
}
