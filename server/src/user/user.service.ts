import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        Room: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async getUserTokens(refreshToken: string) {
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const tokens = await this.prisma.token.findUnique({
      where: {
        userId: userData.id,
      },
    });
    if (!tokens) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken,
      user: {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        Room: {
          id: userData.roomId,
        },
      },
      isAuth: true,
    };
  }

  async getUserProfile(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        profile_img: true,
        miniature_img: true,
        level: true,
        dangos: true,
      },
    });
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string | null | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });
    const userDto = new UserDto({ ...user, roomId: userData.roomId });
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken,
    );
    return { user: userDto, ...tokens };
  }
}
