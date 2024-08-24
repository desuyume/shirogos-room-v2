import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.tokenService.validateAccessToken(token);

      if (!payload) {
        throw new UnauthorizedException();
      }

			if (payload.role.toLocaleLowerCase() !== 'admin') {
				throw new ForbiddenException();
			}

      const tokenFromDb = await this.prisma.token.findUnique({
        where: {
          userId: payload.id,
          accessToken: token,
        },
      });

      if (!tokenFromDb) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;
    } catch (e) {
      throw e
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
