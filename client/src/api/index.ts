import axios from 'axios'

console.log(import.meta.env.VITE_BACKEND_URL)
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://192.168.0.102:3001',
  withCredentials: true,
})
