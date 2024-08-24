import $api from '@/http'
import { IPanopticon } from '@/types/panopticon.interface'
import axios from 'axios'

class PanopticonService {
  private URL = `${import.meta.env.VITE_API_URL}/panopticon`

  async getAll() {
    return axios.get<IPanopticon[]>(`${this.URL}`)
  }

  async getUnique() {
    return axios.get<IPanopticon[]>(`${this.URL}/unique`)
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

export default new PanopticonService()
