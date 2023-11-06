import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Redirect,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { ChangeRoomColorDto } from './dto/change-room-color.dto'
import { ChangeUniqueRoleDto } from './dto/change-uniqueRole.dto'
import { BuyUniqueRoleDto } from './dto/buy-uniqueRole.dto'
import { ChooseFavoriteCharacterDto } from './dto/choose-favorite-character.dto'
import { ChooseActiveRoomBackgroundDto } from './dto/choose-active-room-background.dto'

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

  @UseGuards(AuthGuard)
  @Get('colors')
  async getUserRoomColors(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getUserRoomColors(+id);
  }

  @UseGuards(AuthGuard)
  @Put('roomColor')
  async changeRoomColor(@Request() req, @Body() dto: ChangeRoomColorDto) {
    const { id } = req.user;
    return await this.roomService.changeRoomColor(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Put('usernameColor')
  async changeUsernameColor(@Request() req, @Body() dto: ChangeRoomColorDto) {
    const { id } = req.user;
    return await this.roomService.changeUsernameColor(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('uniqueRole')
  async getUserUniqueRoles(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getUserUniqueRoles(+id);
  }

  @UseGuards(AuthGuard)
  @Put('uniqueRole')
  async changeUniqueRole(@Request() req, @Query('type') type, @Body() dto: ChangeUniqueRoleDto) {
    const { id } = req.user;
    return await this.roomService.changeUniqueRole(+id, type, dto);
  }

  @UseGuards(AuthGuard)
  @Post('uniqueRole')
  async buyUniqueRole(@Request() req, dto: BuyUniqueRoleDto) {
    const { id } = req.user;
    return await this.roomService.buyUniqueRole(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('character')
  async getRoomCharacters(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomCharacters(+id);
  }

  @UseGuards(AuthGuard)
  @Post('character')
  async chooseFavoriteCharacter(@Request() req, @Body() dto: ChooseFavoriteCharacterDto) {
    const { id } = req.user;
    return await this.roomService.chooseFavoriteCharacter(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('background/active')
  async getActiveRoomBackground(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getActiveRoomBackground(+id);
  }

  @UseGuards(AuthGuard)
  @Get('background')
  async getRoomBuyedBackgrounds(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomBuyedBackgrounds(+id);
  }

  @UseGuards(AuthGuard)
  @Put('background/active')
  async chooseActiveRoomBackground(@Request() req, @Body() dto: ChooseActiveRoomBackgroundDto) {
    const { id } = req.user;
    return await this.roomService.chooseActiveRoomBackground(+id, dto);
  }
}