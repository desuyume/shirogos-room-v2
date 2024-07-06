import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { cookieConfig } from 'src/consts/cookieConfig';
import { AuthGuard } from 'src/auth/guards/auth.guard';
const cookie = require('cookie');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get()
  async getUserTokens(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.userService.getUserTokens(refreshToken);
      return res.json(userData);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    try {
      const { id } = req.user;
      return await this.userService.getUserProfile(+id);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.userService.logout(refreshToken);
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', '', {
          ...cookieConfig,
          maxAge: -1, // Set maxAge to -1 to expire the cookie immediately
          expires: new Date(0), // Alternatively, you can use expires: new Date(0)
        }),
      );
      return res.json({ message: 'Logout success', data: token });
    } catch (e) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', '', {
          ...cookieConfig,
          maxAge: -1, // Set maxAge to -1 to expire the cookie immediately
          expires: new Date(0), // Alternatively, you can use expires: new Date(0)
        }),
      );
      throw new UnauthorizedException();
    }
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.userService.refresh(refreshToken);
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', userData.refreshToken, cookieConfig),
      );
      return res.json(userData);
    } catch (e) {
      await this.logout(req, res);
      throw new UnauthorizedException();
    }
  }
}
