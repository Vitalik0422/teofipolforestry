import type { GetKv, Vid } from '@/types/mapTypes'
import { instance } from '.'

export const getKV = async () => (await instance.get('/map/kv')).data as GetKv[]

export async function createKv(kvNumber: number) {
  const response = await instance.post('/map/kv', { number: kvNumber })
  return response
}
export async function updateKv(id: string, data: Vid) {
  const response = await instance.patch(`/map/${id}`, data)
  return response.data
}

export async function deleteVid(id: string) {
  const response = await instance.delete(`/map/vid/${id}`)
  return response.data
}
