import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserPayloadDto } from 'src/user/dto/user-payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async twitchAuth(user: UserPayloadDto) {
    const tokens = this.tokenService.generateTokens({ ...user });

    await this.tokenService.saveToken(
      user.id,
      tokens.refreshToken,
      tokens.accessToken,
    );

    return { user: user, ...tokens };
  }
}
