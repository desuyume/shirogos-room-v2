import { IAward, IAwardType } from '@/types/award.interface'
import axios from 'axios'

class BirthdayAwardService {
	private URL = `${import.meta.env.VITE_API_URL}/award`

	async getAll() {
		return axios.get<IAward[]>(`${this.URL}`)
	}

	async getAwardTypes() {
		return axios.get<IAwardType[]>(`${this.URL}/type`)
	}

	async create(award: FormData) {
		return axios.post(`${this.URL}`, award)
	}

	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new BirthdayAwardService()
