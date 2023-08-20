import { IUserPayload } from 'types/IUser.js';
import tokenService from './TokenService.js';

class AuthService {
	async handleSuccessfulLogin(userDto: IUserPayload) {
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.accessToken);
		return { user: userDto, ...tokens };
	}
}

export default new AuthService();
