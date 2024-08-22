import { IBirthdayAward, IUpdateBirthadyAward } from '@/types/birthday-award.interface'
import axios from 'axios'

class BirthdayAwardService {
  private URL = `${import.meta.env.VITE_API_URL}/birthdayAward`

  async get() {
    return axios.get<IBirthdayAward>(`${this.URL}`)
  }

  async update({ award }: IUpdateBirthadyAward) {
    return axios.patch(`${this.URL}`, {
      award
    })
  }
}

export default new BirthdayAwardService()
