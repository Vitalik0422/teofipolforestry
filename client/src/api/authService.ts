import type { LoginRequest, SessionResponse, User } from '@/types/auth'
import { instance } from '.'

export async function login(data: LoginRequest): Promise<User> {
  const response = await instance.post<User>('/auth/login', data)
  return response.data
}

export async function refresh() {
  await instance.post<void>('/auth/refresh')
}

export async function checkSession(): Promise<SessionResponse> {
  const response = await instance.get<SessionResponse>('/auth/session')
  return response.data
}
