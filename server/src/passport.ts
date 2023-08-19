import { Strategy } from 'passport-twitch-strategy';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

const prisma = new PrismaClient();

const InitPassport = () => {
	passport.serializeUser((id: number, done) => {
		return done(null, id);
	});

	passport.deserializeUser(async (id: number, done) => {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});

		return done(null, user);
	});

	passport.use(
		new Strategy(
			{
				clientID: process.env.TWITCH_CLIENT_ID,
				clientSecret: process.env.TWITCH_CLIENT_SECRET,
				callbackURL: '/auth/twitch/callback',
				scope: 'user:read:email'
			},
			async function (accessToken, refreshToken, profile, done) {
				const twitchProfile = await prisma.twitchProfile.upsert({
					where: {
						id: +profile.id
					},
					update: {},
					create: {
						id: +profile.id,
						email: profile.email,
						login: profile.login,
						profile_img: profile.profile_image_url,
						displayName: profile.displayName
					}
				});
				const user = await prisma.user.upsert({
					where: {
						twitchId: twitchProfile.id
					},
					update: {},
					create: {
						username: twitchProfile.displayName,
						email: twitchProfile.email,
						profile_img: twitchProfile.profile_img,
						twitchId: twitchProfile.id
					}
				});

				done(null, user.id);
			}
		)
	);
};

export default InitPassport;
