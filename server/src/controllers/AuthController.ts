import { NextFunction, Request, Response } from 'express';
import UserDto from '../dtos/UserDto.js';
import { IUserPayload } from '../types/IUser.js';
import AuthService from '../services/AuthService.js';

class AuthController {
	async handleSuccessfulLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const userDto = new UserDto(req.user as IUserPayload);
			const userData = await AuthService.handleSuccessfulLogin(userDto);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});
			return res.redirect(`${process.env.CLIENT_URL}/room/create`);
		} catch (e) {
			next(e);
		}
	}
}

export default new AuthController();
