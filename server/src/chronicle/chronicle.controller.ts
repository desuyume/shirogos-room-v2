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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { isMonth } from 'src/utils/isMonth';
import { CreateChronicleEventDto } from './dto/create-chronicle-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { isNumber } from 'src/utils/isNumber';
import { multerOptions } from 'src/config/multer.config';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('chronicle')
export class ChronicleController {
  constructor(private readonly chronicleService: ChronicleService) {}

  @Get('')
  async getAll() {
    return await this.chronicleService.getAll();
  }

  @Get('getOne')
  async getOne(@Query('skip') skip) {
    return this.chronicleService.getOne(+skip);
  }

  @Get('count')
  async getCount() {
    return this.chronicleService.getCount();
  }

  @UseGuards(AdminGuard)
  @Post('')
  async create(@Body() dto: CreateChronicleDto) {
    if (!isMonth(dto.month)) {
      throw new BadRequestException('invalid month');
    }

    return await this.chronicleService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.chronicleService.delete(+id);
  }

  @Get(':id')
  async getChroincle(@Param('id') id: string) {
    return await this.chronicleService.getChroincle(+id);
  }

  @UseGuards(AdminGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('img', multerOptions))
  async createEvent(
    @Body() dto: CreateChronicleEventDto,
    @UploadedFile() img: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!dto.text && !img) {
      throw new BadRequestException('text or img is required');
    }

    if (!isNumber(dto.day)) {
      throw new BadRequestException('day must be number');
    }

    return await this.chronicleService.createEvent(+id, dto, img);
  }

  @UseGuards(AdminGuard)
  @Delete('/event/:id')
  async deleteEvent(@Param('id') id: string) {
    return await this.chronicleService.deleteEvent(+id);
  }
}
