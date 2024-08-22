import { IAddUserStats, IUserStats } from '@/types/user.interface'
import axios from 'axios'

class UserStatsService {
  private URL = `${import.meta.env.VITE_API_URL}/userStats`

  async get(id: number | null) {
    return await axios.get<IUserStats>(`${this.URL}/${id}`)
  }

  async add(id: number | null, type: string, stats: IAddUserStats) {
    if (!id) return

    return await axios.post(`${this.URL}/${id}?type=${type}`, stats)
  }
}

export default new UserStatsService()
