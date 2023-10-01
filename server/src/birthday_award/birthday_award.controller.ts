import { Body, Controller, Get, Patch } from '@nestjs/common';
import { BirthdayAwardService } from './birthday_award.service';
import { UpdateBirthdayAwardDto } from './dto/update-birthday-award'

@Controller('birthdayAward')
export class BirthdayAwardController {
  constructor(private readonly birthdayAwardService: BirthdayAwardService) {}

  @Get('')
  async getOne() {
    return this.birthdayAwardService.getOne();
  }

  @Patch('')
  async updateAward(@Body() dto: UpdateBirthdayAwardDto) {
    return this.birthdayAwardService.updateAward(dto);
  }
}
