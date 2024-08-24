import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserStatsService } from './user_stats.service';
import { AddUserStatsDto } from './dto/add-user-stats.dto'
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('userStats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get(':id')
  async getUserStats(@Param('id') id: string) {
    return this.userStatsService.getUserStats(+id);
  }

  @UseGuards(AdminGuard)
  @Post(':id')
  async addStats(@Param('id') id: string, @Query('type') type: string, @Body() dto: AddUserStatsDto) {
    return this.userStatsService.addStats(+id, type, dto);
  }
}
