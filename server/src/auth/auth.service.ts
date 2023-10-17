import { Injectable } from '@nestjs/common';
import { RoomService } from 'src/room/room.service'
import { TokenService } from 'src/token/token.service';
import { UserPayloadDto } from 'src/user/dto/user-payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService, private readonly roomService: RoomService) {}

  async twitchAuth(user: UserPayloadDto) {
    const tokens = this.tokenService.generateTokens({ ...user });

    await this.tokenService.removeTokenByUserId(user.id);
    await this.tokenService.saveToken(
      user.id,
      tokens.refreshToken,
      tokens.accessToken,
    );

    const room = await this.roomService.isRoomCreated(user.id);

    return { user: user, ...tokens, isRoomCreated: room };
  }
}
