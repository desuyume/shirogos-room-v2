import authController from '../controllers/AuthController.js';
import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/twitch', passport.authenticate('twitch'));
authRouter.get(
	'/twitch/callback',
	passport.authenticate('twitch', {
		failureRedirect: `${process.env.CLIENT_URL}`
	}),
	authController.authTwitchCallback
);

export default authRouter;