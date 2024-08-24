import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto, UpdateStoryDto } from './dto/create-update-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('coverImg', multerOptions))
  async create(
    @Body() dto: CreateStoryDto,
    @UploadedFile() coverImg: Express.Multer.File,
  ) {
    return await this.storyService.create(dto, coverImg);
  }

  @Get()
  async getAll() {
    return await this.storyService.getAll();
  }

  @Get('general')
  async getAllGeneral() {
    return await this.storyService.getAllGeneral();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.storyService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('coverImg', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStoryDto,
    @UploadedFile() coverImg: Express.Multer.File,
  ) {
    return await this.storyService.update(
      id,
      dto,
      !!coverImg ? coverImg : null,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.storyService.remove(id);
  }
}
