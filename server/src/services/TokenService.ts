import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { IUserPayload } from '../types/IUser.js';
import ApiError from '../exceptions/ApiError.js';

const prisma = new PrismaClient();

class TokenService {
	generateTokens = (payload: IUserPayload) => {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '30m'
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '7d'
		});
		return {
			accessToken,
			refreshToken
		};
	};

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData as IUserPayload;
		} catch (e) {
			return null;
		}
	}

	async saveToken(userId: number, refreshToken: string, accessToken: string) {
		const token = await prisma.token.upsert({
			where: {
				userId
			},
			update: {
				refreshToken
			},
			create: {
				userId,
				refreshToken,
				accessToken
			}
		});
		return token;
	}

	async removeToken(refreshToken: string) {
		try {
			const tokenData = await prisma.token.delete({
				where: {
					refreshToken: refreshToken
				}
			});
			return tokenData;
		} catch (e) {
			throw ApiError.UnauthorizedError();
		}
	}

	async findToken(refreshToken: string) {
		const tokenData = await prisma.token.findUnique({
			where: {
				refreshToken: refreshToken
			}
		});
		return tokenData;
	}
}

export default new TokenService();
