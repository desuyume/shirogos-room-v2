import {
	IAchievementFetch,
	IAchievementFetchWithAward,
} from '@/types/achievements.interface'
import axios from 'axios'

class AchievementService {
	private URL = `${import.meta.env.VITE_API_URL}/achievement`

	async getAll() {
		return await axios.get<IAchievementFetchWithAward[]>(`${this.URL}/all`)
	}

	async create(achieve: FormData) {
		return await axios.post(`${this.URL}`, achieve)
	}

	async update(id: number | null, achieve: FormData) {
		if (!id) return
		return await axios.put(`${this.URL}/${id}`, achieve)
	}

	async remove(id: number | null) {
		if (!id) return
		return await axios.delete(`${this.URL}/${id}`)
	}

	async getByUsername(username: string) {
		return await axios.get<IAchievementFetch[]>(`${this.URL}/${username}`)
	}
}

export default new AchievementService()
