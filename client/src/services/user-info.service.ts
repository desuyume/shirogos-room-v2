import $api from '@/http'
import { IUpdateBirthday, IUpdateGender, IUpdateUsername, IUserInfo } from '@/types/user.interface'

class UserStatsService {
	private URL = `${import.meta.env.VITE_API_URL}/userInfo`

	async get() {
		return await $api.get<IUserInfo>(this.URL)
	}

	async updateUsername(dto: IUpdateUsername) {
		return await $api.patch(`${this.URL}/username`, dto)
	}

	async updateBirthday(dto: IUpdateBirthday) {
		return await $api.patch(`${this.URL}/birthday`, dto)
	}

	async updateGender(dto: IUpdateGender) {
		return await $api.patch(`${this.URL}/gender`, dto)
	}

	async updateProfileImg(content: FormData) {
		return await $api.patch(`${this.URL}/profileImg`, content)
	}

	async updateMiniatureImg(content: FormData) {
		return await $api.patch(`${this.URL}/miniatureImg`, content)
	}
}

export default new UserStatsService()
