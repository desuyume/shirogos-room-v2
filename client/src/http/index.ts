import userService from '@/services/user.service'
import axios from 'axios'

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        await userService.refresh()
        return $api.request(originalRequest)
      } catch (e) {
        console.error('unauthorized')
      }
    }
    throw error
  }
)

export default $api
