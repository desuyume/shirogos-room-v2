import { ICreateOrderManually, IFetchedOrderPrice, IOrderByTypes, IOrderRules, IOrderType, IUpdateOrderPrice, IUpdateOrderRules, IUserOrder } from '@/types/order.interface'
import axios from 'axios'

class OrderService {
	private URL = `${import.meta.env.VITE_API_URL}/order`

	async getOrderTypes() {
		return axios.get<IOrderType[]>(`${this.URL}/type`)
	}

	async getOrdersByType(type: string) {
		return axios.get<IOrderByTypes[]>(`${this.URL}/info?type=${type}`)
	}

	async getOrderRulesByType(type: string) {
		return axios.get<IOrderRules>(`${this.URL}/rules?type=${type}`)
	}

	async getPendingOrders() {
		return axios.get<IUserOrder[]>(`${this.URL}/pending`)
	}

	async getCompletedOrders() {
		return axios.get<IUserOrder[]>(`${this.URL}/completed`)
	}

	async getRejectedOrders() {
		return axios.get<IUserOrder[]>(`${this.URL}/rejected`)
	}

	async updateOrderPrice(id: number, dto: IUpdateOrderPrice) {
		return axios.put(`${this.URL}/price/${id}`, dto)
	}

	async updateOrderRules(type: string, dto: IUpdateOrderRules) {
		return axios.put(`${this.URL}/rules/${type}`, dto)
	}

	async getOrderPrices() {
		return axios.get<IFetchedOrderPrice[]>(`${this.URL}/price`)
	}

	async createOrderManually(dto: ICreateOrderManually) {
		return axios.post(`${this.URL}/manually`, dto)
	}

	async completeOrder(id: number) {
		return axios.patch(`${this.URL}/complete/${id}`)
	}

	async rejectOrder(id: number) {
		return axios.patch(`${this.URL}/reject/${id}`)
	}
}

export default new OrderService()
