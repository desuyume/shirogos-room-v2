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
import { BackgroundService } from './background.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateBgDto } from './dto/create-bg.dto';

@Controller('background')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Get()
  async getAll() {
    try {
      return await this.backgroundService.getAll();
    } catch (e) {
      throw e;
    }
  }

  @Get('unique')
  async getUnique() {
    return await this.backgroundService.getUnique();
  }

  @Post()
  @UseInterceptors(FileInterceptor('bgImg', multerOptions))
  async create(
    @Body() dto: CreateBgDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.backgroundService.create(dto, img);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.backgroundService.delete(+id);
    } catch (e) {
      throw e;
    }
  }
}
