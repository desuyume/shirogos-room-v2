import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwitchAuthGuard } from './guards/twitch-auth.guard'
import { UserDto } from 'src/user/dto/user.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitch')
  @UseGuards(TwitchAuthGuard)
  async auth() {}

  @Get('twitch/callback')
  @UseGuards(TwitchAuthGuard)
  async twitchAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const userDto = new UserDto(req.user);
			const userData = await this.authService.auth(userDto);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
        sameSite: 'none'
			});

			return res.redirect(`${process.env.CLIENT_URL}/room/create`);
    } catch (e) {
      throw e;
    }
  }
}
