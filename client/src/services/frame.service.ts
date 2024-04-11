import { IFrame } from '@/types/frame.interface'
import axios from 'axios'

class FrameService {
	private URL = `${import.meta.env.VITE_API_URL}/frame`

	async getAll() {
		return axios.get<IFrame[]>(`${this.URL}`)
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

export default new FrameService()
