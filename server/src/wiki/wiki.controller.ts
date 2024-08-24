import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WikiService } from './wiki.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/create-update-character.dto';
import { CreateCharacterCategoryDto } from './dto/create-character-category.dto'
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService) {}

  @UseGuards(AdminGuard)
  @Post('character')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'originalImg', maxCount: 1 },
        { name: 'miniatureImg', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async createCharacter(
    @Body() dto: CreateCharacterDto,
    @UploadedFiles()
    files: {
      originalImg: Express.Multer.File[];
      miniatureImg: Express.Multer.File[];
    },
  ) {
    return this.wikiService.createCharacter(
      dto,
      !!files.originalImg ? files.originalImg[0] : null,
      !!files.miniatureImg ? files.miniatureImg[0] : null,
    );
  }

  @Get('character')
  async getAllCharacters() {
    return this.wikiService.getAllCharacters();
  }

  @Get('character/:id')
  async getCharacter(@Param('id') id: string) {
    return this.wikiService.getCharacter(id);
  }

  @UseGuards(AdminGuard)
  @Put('character/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'originalImg', maxCount: 1 },
        { name: 'miniatureImg', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: UpdateCharacterDto,
    @UploadedFiles()
    files: {
      originalImg: Express.Multer.File[];
      miniatureImg: Express.Multer.File[];
    },
  ) {    
    return this.wikiService.updateCharacter(
      id,
      dto,
      !!files.originalImg ? files.originalImg[0] : null,
      !!files.miniatureImg ? files.miniatureImg[0] : null,
    );
  }

  @UseGuards(AdminGuard)
  @Delete('character/:id')
  async deleteCharacter(@Param('id') id: string) {
    return this.wikiService.deleteCharacter(id);
  }

  @Get('characterCategory')
  async getCharacterCategories() {
    return this.wikiService.getCharacterCategories();
  }

  @UseGuards(AdminGuard)
  @Post('characterCategory')
  async createCharacterCategory(@Body() dto: CreateCharacterCategoryDto) {
    return this.wikiService.createCharacterCategory(dto);
  }

  @UseGuards(AdminGuard)
  @Delete('characterCategory/:id')
  async deleteCharacterCategory(@Param('id') id: string) {
    return this.wikiService.deleteCharacterCategory(+id);
  }
}
