import {
  BadRequestException,
  Controller,
  Get,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwitchAuthGuard } from './guards/twitch-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';
import { cookieConfig } from 'src/config/cookieConfig';
const cookie = require('cookie');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitch')
  @UseGuards(TwitchAuthGuard)
  async twitchAuth(@Request() req) {}

  @Get('twitch/callback')
  @UseGuards(TwitchAuthGuard)
  async twitchAuthCallback(@Request() req, @Res() res: Response) {
    if (!req.user) {
      throw new BadRequestException('no user from twitch');
    }

    const userDto = new UserDto(req.user);
    const userData = await this.authService.twitchAuth(userDto);

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('refreshToken', userData.refreshToken, cookieConfig),
    );

    if (userData.isRoomCreated) {
      return res.redirect(`${process.env.CLIENT_URL}/room`);
    }

    return res.redirect(`${process.env.CLIENT_URL}/room/create`);
  }
}
