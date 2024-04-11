import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PanopticonService } from './panopticon.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreatePanopticonDto } from './dto/create-panopticon.dto';

@Controller('panopticon')
export class PanopticonController {
  constructor(private readonly panopticonService: PanopticonService) {}

  @Get()
  async getAll() {
    try {
      return await this.panopticonService.getAll();
    } catch (e) {
      throw e;
    }
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'miniatureImg', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async create(
    @Body() dto: CreatePanopticonDto,
    @UploadedFiles()
    files: {
      img: Express.Multer.File[];
      miniatureImg: Express.Multer.File[];
    },
  ) {
    return await this.panopticonService.create(
      dto,
      !!files.img ? files.img[0] : null,
      !!files.miniatureImg ? files.miniatureImg[0] : null,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.panopticonService.delete(+id);
    } catch (e) {
      throw e;
    }
  }
}
