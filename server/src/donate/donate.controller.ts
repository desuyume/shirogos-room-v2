import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateDto } from './dto/donate.dto';
import {
  UpdateAmountDonateDto,
  UpdateGiftsDonateDto,
} from './dto/update-donate.dto';

@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post()
  create(@Body() createDonateDto: DonateDto) {
    try {
      return this.donateService.create(createDonateDto);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  getAll() {
    try {
      return this.donateService.getAll();
    } catch (e) {
      throw e;
    }
  }

  @Patch('updateAmount/:id')
  updateAmount(@Param('id') id: number, @Body() dto: UpdateAmountDonateDto) {
    return this.donateService.updateAmount(id, dto);
  }

  @Patch('updateGifts/:id')
  updateGifts(@Param('id') id: number, @Body() dto: UpdateGiftsDonateDto) {
    return this.donateService.updateGifts(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donateService.delete(+id);
  }
}
