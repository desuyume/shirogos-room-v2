import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateDto } from './dto/donate.dto';
import {
  UpdateAmountDonateDto,
  UpdateGiftsDonateDto,
} from './dto/update-donate.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Patch('updateAmount/:id')
  updateAmount(@Param('id') id: number, @Body() dto: UpdateAmountDonateDto) {
    return this.donateService.updateAmount(id, dto);
  }

  @UseGuards(AdminGuard)
  @Patch('updateGifts/:id')
  updateGifts(@Param('id') id: number, @Body() dto: UpdateGiftsDonateDto) {
    return this.donateService.updateGifts(id, dto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donateService.delete(+id);
  }
}
