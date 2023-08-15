import {
	ICreateDonate,
	IDonate,
	IUpdateDonateAmount,
	IUpdateDonateGifts,
} from '@/types/donate.interface'
import axios from 'axios'

class DonateService {
	private URL = `${import.meta.env.VITE_API_URL}/donate`

	async getAll() {
		return axios.get<IDonate[]>(this.URL)
	}

	async create({ username, amount, gifts }: ICreateDonate) {
		return axios.post<any, any, ICreateDonate>(this.URL, {
			username,
			amount,
			gifts,
		})
	}

	async updateAmount({ id, addAmount }: IUpdateDonateAmount) {
		return axios.patch(`${this.URL}/updateAmount/${id}`, {
			addAmount,
		})
	}

	async updateGifts({ id, gifts }: IUpdateDonateGifts) {
		return axios.patch(`${this.URL}/updateGifts/${id}`, {
			gifts,
		})
	}

	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}
}

export default new DonateService()
