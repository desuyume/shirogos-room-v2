import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomGuideService } from './room-guide.service';

@Controller('room-guide')
export class RoomGuideController {
  constructor(private readonly roomGuideService: RoomGuideService) {}

  @Get('randomRooms')
  async getRandomRooms() {
    return await this.roomGuideService.getRandomRooms();
  }

  @Get('byLevel')
  async getRoomsByLevel(@Query('limit') limit: string, @Query('page') page: string) {
    return await this.roomGuideService.getRoomsByLevel(+limit, +page);
  }

  @Get(':username')
  async getRoomByUsername(@Param('username') username: string) {
    return await this.roomGuideService.getRoomByUsername(username);
  }
}
