import {
	ICreateUniqueRole,
	IUniqueRole,
	UniqueRoleType,
} from '@/types/unique-role.interface'
import axios from 'axios'

class UniqueRoleService {
	private URL = `${import.meta.env.VITE_API_URL}/uniqueRole`

	async getAll(type: UniqueRoleType) {
		return axios.get<IUniqueRole[]>(`${this.URL}?type=${type}`)
	}

	async getUnique(type: UniqueRoleType) {
		return axios.get<IUniqueRole[]>(`${this.URL}/unique?type=${type}`)
	}

	async create(data: ICreateUniqueRole, type: UniqueRoleType) {
		return axios.post(`${this.URL}?type=${type}`, data)
	}

	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new UniqueRoleService()
