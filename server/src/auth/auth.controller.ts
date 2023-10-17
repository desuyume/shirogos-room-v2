import { BadRequestException, Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwitchAuthGuard } from './guards/twitch-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { Response } from 'express';

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

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
    });

    if (userData.isRoomCreated) {
      return res.redirect(`${process.env.CLIENT_URL}/room`);
    }

    return res.redirect(`${process.env.CLIENT_URL}/room/create`);
  }
}
