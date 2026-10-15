export interface LoginRequest {
  login: string
  password: string
}

export interface User {
  id: string
  login: string
}

export interface SessionResponse {
  user: User
}
