import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateMangaChapterDto } from './dto/create-manga-chapter.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'coverImg', maxCount: 1 }, { name: 'pageImgs' }],
      multerOptions,
    ),
  )
  async create(
    @Body() dto: CreateMangaDto,
    @UploadedFiles()
    files: {
      coverImg: Express.Multer.File[];
      pageImgs: Express.Multer.File[];
    },
  ) {
    return await this.mangaService.create(
      dto,
      !!files.coverImg ? files.coverImg[0] : null,
      !!files.pageImgs ? files.pageImgs : null,
    );
  }

  @Get()
  async getAll() {
    return await this.mangaService.getAll();
  }

  @Get(':id/:chapter')
  async getOne(@Param('id') id: string, @Param('chapter') chapter: string) {
    return await this.mangaService.getOne(id, +chapter);
  }

  @Get('chapters')
  async getAllWithChapters() {
    return await this.mangaService.getAllWithChapters();
  }

  @UseGuards(AdminGuard)
  @Post(':id/chapter')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'pageImgs' }], multerOptions))
  async addChapter(
    @Param('id') id: string,
    @Body() dto: CreateMangaChapterDto,
    @UploadedFiles()
    files: {
      pageImgs: Express.Multer.File[];
    },
  ) {
    return await this.mangaService.addChapter(
      id,
      dto,
      !!files.pageImgs ? files.pageImgs : null,
    );
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'coverImg', maxCount: 1 }, { name: 'pageImgs' }],
      multerOptions,
    ),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMangaDto,
    @UploadedFiles()
    files: {
      coverImg: Express.Multer.File[];
      pageImgs: Express.Multer.File[];
    },
  ) {
    return await this.mangaService.update(
      id,
      dto,
      !!files.coverImg ? files.coverImg[0] : null,
      !!files.pageImgs ? files.pageImgs : null,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.mangaService.delete(+id);
  }
}
