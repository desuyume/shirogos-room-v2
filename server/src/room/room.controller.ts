import {
  Body,
  Controller,
  Get,
  Param,
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
import { ChangeRoomColorDto } from './dto/change-room-color.dto';
import { ChangeUniqueRoleDto } from './dto/change-uniqueRole.dto';
import { BuyUniqueRoleDto } from './dto/buy-uniqueRole.dto';
import { ChooseFavoriteCharacterDto } from './dto/choose-favorite-character.dto';
import { ChooseActiveRoomBackgroundDto } from './dto/choose-active-room-background.dto';
import { ChangeRoomNameDto } from './dto/change-roomName.dto';
import { BuyColorDto } from './dto/buy-color.dto';
import { MakeOrderDto } from './dto/make-order.dto'
import { BuyPanopticonDto } from './dto/buy-panopticon.dto'
import { UpdateRoomEditorDto } from './dto/update-room-editor'

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
  async createRoom(@Request() req, @Body() dto: CreateRoomDto) {
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
  @Post('roomColor')
  async buyColor(
    @Request() req,
    @Query('type') type,
    @Body() dto: BuyColorDto,
  ) {
    const { id } = req.user;
    return await this.roomService.buyColor(+id, type, dto);
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
  async changeUniqueRole(
    @Request() req,
    @Query('type') type,
    @Body() dto: ChangeUniqueRoleDto,
  ) {
    const { id } = req.user;
    return await this.roomService.changeUniqueRole(+id, type, dto);
  }

  @UseGuards(AuthGuard)
  @Post('uniqueRole')
  async buyUniqueRole(@Request() req, @Body() dto: BuyUniqueRoleDto) {
    const { id } = req.user;
    return await this.roomService.buyUniqueRole(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('uniqueRole/boutique')
  async getBoutiqueUniqueRoles(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getBoutiqueUniqueRoles(+id);
  }

  @UseGuards(AuthGuard)
  @Get('character')
  async getRoomCharacters(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomCharacters(+id);
  }

  @UseGuards(AuthGuard)
  @Post('character')
  async chooseFavoriteCharacter(
    @Request() req,
    @Body() dto: ChooseFavoriteCharacterDto,
  ) {
    const { id } = req.user;
    return await this.roomService.chooseFavoriteCharacter(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('character/favorite')
  async getFavoriteCharacter(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getFavoriteCharacter(+id);
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
  async chooseActiveRoomBackground(
    @Request() req,
    @Body() dto: ChooseActiveRoomBackgroundDto,
  ) {
    const { id } = req.user;
    return await this.roomService.chooseActiveRoomBackground(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Put('roomName')
  async changeRoomName(@Request() req, @Body() dto: ChangeRoomNameDto) {
    const { id } = req.user;
    return await this.roomService.changeRoomName(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Post('order')
  async makeOrder(@Request() req, @Body() dto: MakeOrderDto, @Query('type') type) {
    const { id } = req.user;
    return await this.roomService.makeOrder(+id, dto, type);
  }

  @UseGuards(AuthGuard)
  @Get('panopticon')
  async getRoomPanopticons(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomPanopticons(+id);
  }

  @UseGuards(AuthGuard)
  @Post('panopticon')
  async buyPanopticon(@Request() req, @Body() dto: BuyPanopticonDto) {
    const { id } = req.user;
    return await this.roomService.buyPanopticon(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Get('panopticon/:panopticonId')
  async getRoomPanopticon(@Request() req, @Param('panopticonId') panopticonId: number) {
    const { id } = req.user;
    return await this.roomService.getRoomPanopticon(+id, +panopticonId);
  }

  @UseGuards(AuthGuard)
  @Get('badge')
  async getBuyedBadges(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getBuyedBadges(+id);
  }

  @UseGuards(AuthGuard)
  @Get('badge/boutique')
  async getBoutiqueBadges(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getBoutiqueBadges(+id);
  }

  @UseGuards(AuthGuard)
  @Post('badge/:badgeId')
  async buyBoutiqueBadge(@Request() req, @Param('badgeId') badgeId: number) {
    const { id } = req.user;
    return await this.roomService.buyBoutiqueBadge(+id, +badgeId);
  }

  @UseGuards(AuthGuard)
  @Get('background/boutique')
  async getBoutiqueBackgrounds(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getBoutiqueBackgrounds(+id);
  }

  @UseGuards(AuthGuard)
  @Post('background/:bgId')
  async buyBoutiqueBackground(@Request() req, @Param('bgId') bgId: number) {
    const { id } = req.user;
    return await this.roomService.buyBoutiqueBackground(+id, +bgId);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  async getRoomStats(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomStats(+id);
  }

  @UseGuards(AuthGuard)
  @Get('editor')
  async getRoomEditor(@Request() req) {
    const { id } = req.user;
    return await this.roomService.getRoomEditor(+id);
  }

  @UseGuards(AuthGuard)
  @Put('editor')
  async updateRoomEditor(@Request() req, @Body() dto: UpdateRoomEditorDto) {
    const { id } = req.user;
    return await this.roomService.updateRoomEditor(+id, dto);
  }
}
