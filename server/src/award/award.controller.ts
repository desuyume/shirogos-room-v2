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
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Get('')
  async getAllAwards() {
    return this.awardService.getAllAwards();
  }

  @Get('type')
  async getAwardTypes() {
    return this.awardService.getAwardTypes();
  }

  @Post('')
  @UseInterceptors(FileInterceptor('awardImg', multerOptions))
  async createAward(
    @Body() dto: CreateAwardDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.awardService.createAward(dto, img);
  }

  @Delete(':id')
  async deleteAward(@Param('id') id: string) {
    return this.awardService.deleteAward(+id);
  }
}
