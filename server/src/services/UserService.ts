import { PrismaClient } from '@prisma/client';
import tokenService from './TokenService.js';
import UserDto from '../dtos/UserDto.js';
import ApiError from '../exceptions/ApiError.js'

const prisma = new PrismaClient();

class UserService {
	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string | null | undefined) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userData.id
			}
		});
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.accessToken);
		return { user: userDto, ...tokens };
	}
}

export default new UserService();
