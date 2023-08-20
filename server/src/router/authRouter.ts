import authController from '../controllers/AuthController.js';
import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/twitch', passport.authenticate('twitch'));
authRouter.get(
	'/twitch/callback',
	passport.authenticate('twitch', {
		session: false,
	}),
	authController.handleSuccessfulLogin
);

export default authRouter;