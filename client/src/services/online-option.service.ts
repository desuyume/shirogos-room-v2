import { ICreateOnlineOption, IOnlineOption } from '@/types/online-option.interface'
import axios from 'axios'

class OnlineUserService {
	private URL = `${import.meta.env.VITE_API_URL}/onlineOption`

	async getAll() {
		return axios.get<IOnlineOption[]>(this.URL)
	}

	async getRandom() {
		return axios.get<IOnlineOption>(`${this.URL}/random`)
	}

	async create({ title }: ICreateOnlineOption) {
		return axios.post<any, any, ICreateOnlineOption>(this.URL, {
			title
		})
	}

	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new OnlineUserService()
