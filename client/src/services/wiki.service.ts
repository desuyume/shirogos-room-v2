import { ICategory, ICharacter, ICharacterPreview, ICreateCategory } from '@/types/wiki.interface'
import axios from 'axios'

class WikiService {
  private URL = `${import.meta.env.VITE_API_URL}/wiki`

  async createCharacter(character: FormData) {
    return axios.post(`${this.URL}/character`, character)
  }

  async getAllCharacters() {
    return axios.get<ICharacterPreview[]>(`${this.URL}/character`)
  }

  async getCharacter(id: string | null) {
    if (!id) {
      return
    }

    return axios.get<ICharacter>(`${this.URL}/character/${id}`)
  }

  async updateCharacter(id: string | null, character: FormData) {
    if (!id) {
      return
    }

    return axios.put(`${this.URL}/character/${id}`, character)
  }

  async deleteCharacter(id: string | null) {
    if (!id) {
      return
    }

    return axios.delete(`${this.URL}/character/${id}`)
  }

  async getCharacterCategories() {
    return axios.get<ICategory[]>(`${this.URL}/characterCategory`)
  }

  async createCharacterCategory(data: ICreateCategory) {
    return axios.post(`${this.URL}/characterCategory`, data)
  }

  async deleteCharacterCategory(id: number) {
    return axios.delete(`${this.URL}/characterCategory/${id}`)
  }
}

export default new WikiService()
