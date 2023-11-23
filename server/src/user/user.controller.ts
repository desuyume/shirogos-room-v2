import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { cookieConfig } from 'src/consts/cookieConfig'

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

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.userService.logout(refreshToken);
      res.clearCookie('refreshToken', cookieConfig);
      return res.json({ message: 'Logout success', data: token });
    } catch (e) {
      res.clearCookie('refreshToken', cookieConfig);
      throw new UnauthorizedException();
    }
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, cookieConfig);
      return res.json(userData);
    } catch (e) {
      await this.logout(req, res);
      throw new UnauthorizedException();
    }
  }
}
