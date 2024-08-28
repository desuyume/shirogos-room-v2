import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PanopticonService } from './panopticon.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import {
  CreatePanopticonDto,
  UpdatePanopticonDto,
} from './dto/create-panopticon.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('panopticon')
export class PanopticonController {
  constructor(private readonly panopticonService: PanopticonService) {}

  @Get()
  async getAll() {
    return await this.panopticonService.getAll();
  }

  @Get('unique')
  async getUnique() {
    return await this.panopticonService.getUnique();
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'img', maxCount: 1 },
        { name: 'miniatureImg', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async update(
    @Param('id') id: number,
    @Body() dto: UpdatePanopticonDto,
    @UploadedFiles()
    files: {
      img: Express.Multer.File[];
      miniatureImg: Express.Multer.File[];
    },
  ) {
    return await this.panopticonService.update(
      id,
      dto,
      !!files.img ? files.img[0] : null,
      !!files.miniatureImg ? files.miniatureImg[0] : null,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.panopticonService.delete(+id);
    } catch (e) {
      throw e;
    }
  }
}
