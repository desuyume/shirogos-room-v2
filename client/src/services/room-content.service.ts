import { IRoomContent } from '@/types/room-content.interface'
import axios from 'axios'

class RoomContentService {
	private URL = `${import.meta.env.VITE_API_URL}/roomContent`

	async getAll(type: string) {
		return axios.get<IRoomContent[]>(`${this.URL}?type=${type}`)
	}

	async add(content: FormData, type: string) {
		return axios.post(`${this.URL}?type=${type}`, content)
	}
	
	async delete(id: number, type: string) {
		return axios.delete(`${this.URL}/${id}?type=${type}`)
	}
}

export default new RoomContentService()
