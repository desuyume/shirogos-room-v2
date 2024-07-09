import {
	IRoomGuide,
	IRoomGuideByLevelRes,
	IRoomGuideRandom,
} from '@/types/room-guide.interface'
import axios from 'axios'

class RoomGuideService {
	private URL = `${import.meta.env.VITE_API_URL}/room-guide`

	async getRandomRooms() {
		return await axios.get<IRoomGuideRandom[]>(`${this.URL}/randomRooms`)
	}

	async getRoomsByLevel(limit: number = 10, page: number = 1) {
		return await axios.get<IRoomGuideByLevelRes>(
			`${this.URL}/byLevel?limit=${limit}&page=${page}`
		)
	}

	async getRoomByUsername(username: string) {
		return await axios.get<IRoomGuide>(`${this.URL}/${username}`)
	}
}

export default new RoomGuideService()
