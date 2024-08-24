import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-strategy';
import { PrismaService } from 'src/prisma.service';
import { UserPayloadDto } from 'src/user/dto/user-payload.dto';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: process.env.TWITCH_CALLBACK_URL,
      scope: 'user:read:email',
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const twitchProfile = await this.prisma.twitchProfile.upsert({
      where: {
        id: +profile.id,
      },
      update: {
        email: profile.email,
        login: profile.login,
        profile_img: profile.profile_image_url,
        displayName: profile.displayName,
      },
      create: {
        id: +profile.id,
        email: profile.email,
        login: profile.login,
        profile_img: profile.profile_image_url,
        displayName: profile.displayName,
      },
    });
    const userFromDb = await this.prisma.user.upsert({
      where: {
        twitchId: twitchProfile.id,
      },
      include: {
        Room: {
          select: {
            id: true,
          },
        },
      },
      update: {
        email: twitchProfile.email || null,
        twitchId: twitchProfile.id,
      },
      create: {
        email: twitchProfile.email || null,
        profile_img: twitchProfile.profile_img || null,
        twitchId: twitchProfile.id,
      },
    });

    const user: UserPayloadDto = {
      id: userFromDb.id,
      username: userFromDb.username,
      displayName: twitchProfile.displayName,
      role: userFromDb.role,
      roomId: userFromDb.Room?.id,
    };

    done(null, user);
  }
}
