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
import { FrameService } from './frame.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateFrameDto } from './dto/create-frame.dto';

@Controller('frame')
export class FrameController {
  constructor(private readonly frameService: FrameService) {}

  @Get()
  async getAll() {
    return this.frameService.getAll();
  }

  @Get('unique')
  async getUnique() {
    return this.frameService.getUnique();
  }

  @Post()
  @UseInterceptors(FileInterceptor('frameImg', multerOptions))
  async create(
    @Body() dto: CreateFrameDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.frameService.create(dto, img);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.frameService.delete(+id);
  }
}
