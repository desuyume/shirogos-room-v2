import {
	IActiveBackground,
	IBoutiqueUniqueRoles,
	IBuyRoomColor,
	IBuyRoomPanopticon,
	IBuyUniqueRole,
	IBuyedPanopticon,
	IBuyedRoomBackgrounds,
	IChangeRoomColor,
	IChangeRoomName,
	IChangeUniqueRole,
	IChooseActiveRoomBackground,
	IChooseFavoriteCharacter,
	ICreateRoom,
	IMakeOrder,
	IRoom,
	IRoomCharacters,
	IRoomPanopticons,
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
		return await $api.put<IActiveBackground>(
			`${this.URL}/background/active`,
			data
		)
	}

	async changeRoomName(data: IChangeRoomName) {
		return await $api.put(`${this.URL}/roomName`, data)
	}

	async buyRoomColor(type: string, data: IBuyRoomColor) {
		return await $api.post(`${this.URL}/roomColor?type=${type}`, data)
	}

	async getBoutiqueUniqueRoles() {
		return await $api.get<IBoutiqueUniqueRoles>(
			`${this.URL}/uniqueRole/boutique`
		)
	}

	async buyUniqueRole(data: IBuyUniqueRole) {
		return await $api.post(`${this.URL}/uniqueRole`, data)
	}

	async makeOrder(type: string, data: IMakeOrder) {
		return await $api.post(`${this.URL}/order?type=${type}`, data)
	}

	async getRoomPanopticons() {
		return await $api.get<IRoomPanopticons>(`${this.URL}/panopticon`)
	}

	async buyRoomPanopticon(data: IBuyRoomPanopticon) {
		return await $api.post(`${this.URL}/panopticon`, data)
	}

	async getRoomPanopticon(panopticonId: number) {
		return await $api.get<IBuyedPanopticon>(
			`${this.URL}/panopticon/${panopticonId}`
		)
	}
}

export default new RoomContentService()
