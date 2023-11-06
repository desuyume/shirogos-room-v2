import {
	IActiveBackground,
	IBuyedRoomBackgrounds,
	IChangeRoomColor,
	IChangeUniqueRole,
	IChooseActiveRoomBackground,
	IChooseFavoriteCharacter,
	ICreateRoom,
	IRoom,
	IRoomCharacters,
	IUserRoomColors,
	IUserUniqueRoles,
} from '@/types/room.interface'
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

	async getUserRoomColors() {
		return await $api.get<IUserRoomColors>(`${this.URL}/colors`)
	}

	async changeRoomColor(data: IChangeRoomColor) {
		return await $api.put(`${this.URL}/roomColor`, data)
	}

	async changeUsernameColor(data: IChangeRoomColor) {
		return await $api.put(`${this.URL}/usernameColor`, data)
	}

	async getUserUniqueRoles() {
		return await $api.get<IUserUniqueRoles>(`${this.URL}/uniqueRole`)
	}

	async changeUniqueRole(type: string, data: IChangeUniqueRole) {
		return await $api.put(`${this.URL}/uniqueRole?type=${type}`, data)
	}

	async getRoomCharacters() {
		return await $api.get<IRoomCharacters>(`${this.URL}/character`)
	}

	async chooseFavoriteCharacter(data: IChooseFavoriteCharacter) {
		return await $api.post(`${this.URL}/character`, data)
	}

	async getActiveRoomBackground() {
		return await $api.get<IActiveBackground>(`${this.URL}/background/active`)
	}

	async getBuyedRoomBackgrounds() {
		return await $api.get<IBuyedRoomBackgrounds>(`${this.URL}/background`)
	}

	async chooseActiveRoomBackground(data: IChooseActiveRoomBackground) {
		return await $api.put<IActiveBackground>(`${this.URL}/background/active`, data)
	}
}

export default new RoomContentService()
