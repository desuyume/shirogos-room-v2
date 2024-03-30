import { Controller, Get } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('threeBest')
  async getThreeBestUsers() {
    return this.ratingService.getThreeBestUsers()
  }
}
