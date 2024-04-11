import { IBackground } from '@/types/background.interface'
import axios from 'axios'

class BackgroundService {
	private URL = `${import.meta.env.VITE_API_URL}/background`

	async getAll() {
		return axios.get<IBackground[]>(`${this.URL}`)
	}

	async create(data: FormData) {
		return axios.post(`${this.URL}`, data)
	}

	async delete(id: number | null) {
		if (!id) {
			return
		}

		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new BackgroundService()
