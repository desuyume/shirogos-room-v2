import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { BirthdayAwardService } from './birthday_award.service';
import { UpdateBirthdayAwardDto } from './dto/update-birthday-award'
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('birthdayAward')
export class BirthdayAwardController {
  constructor(private readonly birthdayAwardService: BirthdayAwardService) {}

  @Get('')
  async getOne() {
    return this.birthdayAwardService.getOne();
  }

  @UseGuards(AdminGuard)
  @Patch('')
  async updateAward(@Body() dto: UpdateBirthdayAwardDto) {
    return this.birthdayAwardService.updateAward(dto);
  }
}
