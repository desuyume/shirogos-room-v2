import $api from '@/http'
import {
	ICreateManualTasK,
	IManualTask,
	IManualTaskWithResponses,
	IMyTaskWithResponse,
} from '@/types/manual-task.interface'
import axios from 'axios'

class ManualTaskService {
	private URL = `${import.meta.env.VITE_API_URL}/manual-task`

	async getAll() {
		return axios.get<IManualTask[]>(`${this.URL}`)
	}

	async create(task: ICreateManualTasK) {
		return axios.post(`${this.URL}`, task)
	}

	async delete(id: number) {
		return axios.delete(`${this.URL}/${id}`)
	}

	async getTaskResponses(id: number) {
		return axios.get<IManualTaskWithResponses>(`${this.URL}/${id}/responses`)
	}

	async getMyTasksWithResponses() {
		return $api.get<IMyTaskWithResponse[]>(`${this.URL}/responses/me`)
	}

	async sendResponse(id: number, data: FormData) {
		return $api.post(`${this.URL}/${id}`, data)
	}

	async acceptResponse(id: number) {
		return $api.patch(`${this.URL}/response/accept/${id}`)
	}

	async rejectResponse(id: number) {
		return $api.patch(`${this.URL}/response/reject/${id}`)
	}
}

export default new ManualTaskService()
