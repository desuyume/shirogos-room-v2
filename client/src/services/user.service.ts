import $api from '@/http'
import { IUser, IUserProfile, IUserTokens } from '@/types/user.interface'
import axios from 'axios'

class UserService {
	private URL = `${import.meta.env.VITE_API_URL}/user`

	async get() {
		return await $api.get<IUserTokens | undefined>(this.URL)
	}

	async getAll() {
		return await axios.get<IUser[]>(`${this.URL}/all`)
	}

	async getProfile() {
		return await $api.get<IUserProfile>(`${this.URL}/profile`)
	}

	async refresh() {
		return await axios.get<IUserTokens>(`${this.URL}/refresh`, {
			withCredentials: true,
		})
	}
}

export default new UserService()
