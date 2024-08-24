import $api from '@/http'
import { IFrame } from '@/types/frame.interface'
import axios from 'axios'

class FrameService {
  private URL = `${import.meta.env.VITE_API_URL}/frame`

  async getAll() {
    return axios.get<IFrame[]>(`${this.URL}`)
  }

  async getUnique() {
    return axios.get<IFrame[]>(`${this.URL}/unique`)
  }

  async create(data: FormData) {
    return $api.post(`${this.URL}`, data)
  }

  async delete(id: number | null) {
    if (!id) {
      return
    }

    return $api.delete(`${this.URL}/${id}`)
  }
}

export default new FrameService()
