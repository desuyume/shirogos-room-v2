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
import { FrameService } from './frame.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateFrameDto } from './dto/create-frame.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard'

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

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('frameImg', multerOptions))
  async create(
    @Body() dto: CreateFrameDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.frameService.create(dto, img);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.frameService.delete(+id);
  }
}
