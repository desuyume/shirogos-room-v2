import { IAchievementFetch } from '@/types/achievements.interface'
import axios from 'axios'

class AchievementService {
	private URL = `${import.meta.env.VITE_API_URL}/achievement`

	async getAll() {
		return await axios.get<IAchievementFetch[]>(`${this.URL}`)
	}

	async create(achieve: FormData) {
		return await axios.post(`${this.URL}`, achieve)
	}
}

export default new AchievementService()
