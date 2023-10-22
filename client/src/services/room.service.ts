import { ICreateRoom, IRoom } from '@/types/room.interface'
import $api from '@/http'

class RoomContentService {
	private URL = `${import.meta.env.VITE_API_URL}/room`

	async get() {
		return await $api.get<IRoom>(`${this.URL}`)
	}

	async isCreated() {
		return await $api.get(`${this.URL}/isCreated`)
	}

	async create({ roomName, username }: ICreateRoom) {
		return await $api.post<any, any, ICreateRoom>(`${this.URL}`, {
			roomName,
			username,
		})
	}
}

export default new RoomContentService()
