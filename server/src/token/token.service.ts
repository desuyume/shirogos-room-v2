import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import { UserPayloadDto } from 'src/user/dto/user-payload.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  generateTokens = (payload: UserPayloadDto) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  };

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const payload = new UserPayloadDto(userData);
      return { ...payload };
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData as UserPayloadDto;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string, accessToken: string) {
    return await this.prisma.token.upsert({
      where: {
        userId,
      },
      update: {
        refreshToken,
        accessToken,
      },
      create: {
        userId,
        refreshToken,
        accessToken,
      },
    });
  }

  async removeToken(refreshToken: string) {
    try {
      return await this.prisma.token.delete({
        where: {
          refreshToken: refreshToken,
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async removeTokenByUserId(userId: number) {
    const token = await this.prisma.token.findUnique({
      where: {
        userId,
      },
    });

    if (token) {
      return await this.prisma.token.delete({
        where: {
          userId,
        },
      });
    }

    return
  }

  async findToken(refreshToken: string) {
    return await this.prisma.token.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    });
  }
}
