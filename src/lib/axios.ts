import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WEB_SERVICE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 5000
})
