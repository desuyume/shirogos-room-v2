import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  async getOne(@Query('skip') skip) {
    return this.newsService.getOne(+skip);
  }

  @Get('count')
  async getNewsCount() {
    return this.newsService.getNewsCount();
  }

  @Post('')
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
  async create(
    @Body() dto: CreateNewsDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.newsService.create(dto, img);
  }
}
