import { ICreateUniqueRole, IUniqueRole } from '@/types/unique-role.interface'
import axios from 'axios'

class UniqueRoleService {
	private URL = `${import.meta.env.VITE_API_URL}/uniqueRole`

	async getAll(type: string) {
		return axios.get<IUniqueRole[]>(`${this.URL}?type=${type}`)
	}

	async add({ title, type }: ICreateUniqueRole) {
		return axios.post(`${this.URL}?type=${type}`, {
			title,
		})
	}
	
	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new UniqueRoleService()
