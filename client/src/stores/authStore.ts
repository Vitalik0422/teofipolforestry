import type { LoginRequest, User } from '@/types/auth'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { checkSession, login as loginRequest } from '@/api/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isAuthenticated = computed(() => user.value !== null)

  const setUser = (currentUser: User) => {
    user.value = currentUser
  }

  const clearUser = () => {
    user.value = null
  }

  const loadUser = async (): Promise<User> => {
    try {
      const { user: currentUser } = await checkSession()
      setUser(currentUser)
      return currentUser
    } catch (error) {
      clearUser()
      throw error
    }
  }

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    isLoading.value = true

    try {
      const user = await loginRequest(credentials)
      setUser(user)
      return true
    } catch (error: unknown) {
      const invalidCredentials =
        axios.isAxiosError(error) && error.response?.status === 401

      toast.error(
        invalidCredentials
          ? 'Невірний логін або пароль'
          : 'Не вдалося увійти. Спробуйте пізніше',
      )

      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    clearUser,
    loadUser,
    login,
  }
})
