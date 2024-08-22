import {
  IChronicle,
  IChronicleCount,
  IChronicleWithEvents,
  ICreateChronicle
} from '@/types/chronicle.interface'
import axios from 'axios'

class DonateService {
  private URL = `${import.meta.env.VITE_API_URL}/chronicle`

  async getAll() {
    return axios.get<IChronicle[]>(this.URL)
  }

  async getOne(skip: number) {
    return axios.get<IChronicleWithEvents>(`${this.URL}/getOne?skip=${skip}`)
  }

  async getCount() {
    return axios.get<IChronicleCount>(`${this.URL}/count`)
  }

  async create({ year, month }: ICreateChronicle) {
    return axios.post<any, any, ICreateChronicle>(this.URL, {
      year,
      month
    })
  }

  async delete(id: number) {
    return axios.delete(`${this.URL}/${id}`)
  }

  async getEvents(id: number | null) {
    return axios.get<IChronicleWithEvents>(`${this.URL}/${id}`)
  }

  async createEvent(id: number, event: FormData) {
    return axios.post(`${this.URL}/${id}`, event)
  }

  async deleteEvent(id: number) {
    return axios.delete(`${this.URL}/event/${id}`)
  }
}

export default new DonateService()
