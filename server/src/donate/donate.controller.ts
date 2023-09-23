import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonateService } from './donate.service';
import { DonateDto } from './dto/donate.dto';

@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @Post()
  create(@Body() createDonateDto: DonateDto) {
    return this.donateService.create(createDonateDto);
  }

  @Get()
  findAll() {
    return this.donateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donateService.findOne(+id);
  }
}
