import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getRoom(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoom(id);
  }

  @UseGuards(AuthGuard)
  @Get('isCreated')
  async isRoomCreated(@Request() req) {
    const { id } = req.user;
    return await this.roomService.isRoomCreated(id);
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createRoom(
    @Request() req,
    @Body() dto: CreateRoomDto,
  ) {
    const { id } = req.user;
    return await this.roomService.createRoom(id, dto);
  }
}
