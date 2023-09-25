import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomContentService } from './room-content.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { isNumber } from 'src/utils/isNumber'

@Controller('roomContent')
export class RoomContentController {
  constructor(private readonly roomContentService: RoomContentService) {}

  @Get()
  async getAll(@Query('type') type) {
    try {
      return await this.roomContentService.getAll(type);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './static',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const imgName = v4() + ext;
          callback(null, imgName);
        },
      }),
    }),
  )
  async add(
    @Query('type') type,
    @Body() dto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      if (!isNumber(dto.cost)) {
        throw new BadRequestException('cost must be a number');
      }

      return await this.roomContentService.add(+dto.cost, img, type);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async remove(@Query('type') type, @Param('id') id: string) {
    try {
      const item = await this.roomContentService.remove(+id, type);
      return item;
    } catch (e) {
      throw e;
    }
  }
}
