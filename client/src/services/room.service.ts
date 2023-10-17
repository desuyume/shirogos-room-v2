import { getAuthorizationHeaders } from '@/consts/headers'
import { ICreateRoom } from '@/types/room.interface'
import axios from 'axios'
import userService from './user.service'

class RoomContentService {
	private URL = `${import.meta.env.VITE_API_URL}/room`

	async get() {
		return axios.get(`${this.URL}`)
	}

	async isCreated() {
		let data
		let authorizationHeaders = getAuthorizationHeaders()

		if (!authorizationHeaders) {
			await userService.refresh()
			authorizationHeaders = getAuthorizationHeaders()
		}

		data = await axios.get(`${this.URL}/isCreated`, {
			headers: { ...authorizationHeaders },
		})

		return data
	}

	async create({ roomName, username }: ICreateRoom) {
		let authorizationHeaders = getAuthorizationHeaders()

		if (!authorizationHeaders) {
			await userService.refresh()
			authorizationHeaders = getAuthorizationHeaders()
		}

		return await axios.post<any, any, ICreateRoom>(
			`${this.URL}`,
			{
				roomName,
				username,
			},
			{
				headers: { ...authorizationHeaders },
			}
		)
	}
}

export default new RoomContentService()
