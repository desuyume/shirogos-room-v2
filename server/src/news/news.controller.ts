import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config'
import { AdminGuard } from 'src/auth/guards/admin.guard'

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

  @UseGuards(AdminGuard)
  @Post('')
  @UseInterceptors(
    FileInterceptor('img', multerOptions),
  )
  async create(
    @Body() dto: CreateNewsDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.newsService.create(dto, img);
  }
}
