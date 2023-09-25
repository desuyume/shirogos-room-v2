import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch';
import { PrismaService } from 'src/prisma.service';

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

  async validate(_accessToken, _refreshToken, profile, done) {
    const twitchProfile = await this.prisma.twitchProfile.upsert({
      where: {
        id: +profile.id,
      },
      update: {},
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
      update: {},
      create: {
        username: twitchProfile.displayName,
        email: twitchProfile.email,
        profile_img: twitchProfile.profile_img,
        twitchId: twitchProfile.id,
      },
    });

    const user = {
      id: userFromDb.id,
      email: userFromDb.email,
      role: userFromDb.role,
    };

    done(null, user);
  }
}
