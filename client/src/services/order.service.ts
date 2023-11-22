import { IOrderByTypes, IOrderType } from '@/types/order.interface'
import axios from 'axios'

class OrderService {
	private URL = `${import.meta.env.VITE_API_URL}/order`

	async getOrderTypes() {
		return axios.get<IOrderType[]>(`${this.URL}/type`)
	}

	async getOrdersByType(type: string) {
		return axios.get<IOrderByTypes[]>(`${this.URL}/info?type=${type}`)
	}
}

export default new OrderService()
