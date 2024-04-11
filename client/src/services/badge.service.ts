import { IBadge, IBadgeType } from '@/types/badge.interface'
import axios from 'axios'

class BadgeService {
	private URL = `${import.meta.env.VITE_API_URL}/badge`

	async getAll() {
		return axios.get<IBadge[]>(`${this.URL}`)
	}

	async getUnique() {
		return axios.get<IBadge[]>(`${this.URL}/unique`)
	}

	async getTypes() {
		return axios.get<IBadgeType[]>(`${this.URL}/type`)
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

export default new BadgeService()
