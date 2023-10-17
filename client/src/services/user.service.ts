import { IUserTokens } from '@/types/user.interface'
import axios from 'axios'

class UserService {
	private URL = `${import.meta.env.VITE_API_URL}/user`

	async refresh() {
		const userData = await axios.get<IUserTokens>(`${this.URL}/refresh`, {
			withCredentials: true
		})
		localStorage.setItem('token', userData.data.accessToken);
		return userData;
	}
}

export default new UserService()
