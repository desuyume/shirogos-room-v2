import $api from '@/http'
import { IUserNotifications } from '@/types/notifications.interface'
import axios from 'axios'

class NotificationService {
	private URL = `${import.meta.env.VITE_API_URL}/notification`

	async getUserNotifications() {
		return $api.get<IUserNotifications>(`${this.URL}`)
	}

	async create(data: FormData) {
		return axios.post(`${this.URL}`, data)
	}

	async read(notificationId: number) {
		return $api.patch(`${this.URL}/read/${notificationId}`)
	}
}

export default new NotificationService()
