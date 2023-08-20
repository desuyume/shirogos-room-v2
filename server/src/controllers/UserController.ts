import { NextFunction, Request, Response } from 'express';
import userService from '../services/UserService.js';
import tokenService from '../services/TokenService.js';
import ApiError from '../exceptions/ApiError.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserController {
	async getUserTokens(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = tokenService.validateRefreshToken(refreshToken);
			if (!userData) {
				return res.json({ isAuth: false, message: 'no user' });
			}
			const tokens = await prisma.token.findUnique({
				where: {
					userId: userData.id
				}
			});
			if (!tokens) {
				return res.json({ isAuth: false, message: 'no user' });
			}
			return res.json({
				accessToken: tokens.accessToken,
				refreshToken,
				user: userData,
				isAuth: true
			});
		} catch (e) {
			next(e);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ message: 'Logout success', data: token });
		} catch (e) {
			next(e);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
