import { Controller, Get, Param } from '@nestjs/common';
import { AlmanacService } from './almanac.service';

@Controller('almanac')
export class AlmanacController {
  constructor(private readonly almanacService: AlmanacService) {}

  @Get('/:date')
  async getCurrentBirthdays(@Param('date') date: string) {
    return await this.almanacService.getCurrentBirthdays(date);
  }
}
