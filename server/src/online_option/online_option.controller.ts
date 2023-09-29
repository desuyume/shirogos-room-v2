import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OnlineOptionService } from './online_option.service';
import { CreateOnlineOptionDto } from './dto/create-online_option.dto'

@Controller('onlineOption')
export class OnlineOptionController {
  constructor(private readonly onlineOptionService: OnlineOptionService) {}

  @Get('')
  async getAll() {
    return await this.onlineOptionService.getAll();
  }

  @Get('random')
  async getRandom() {
    return await this.onlineOptionService.getRandom();
  }

  @Post('')
  async create(@Body() dto: CreateOnlineOptionDto) {
    return await this.onlineOptionService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.onlineOptionService.delete(+id);
  }
}
