import { apiClient } from '@/shared/lib/api-client'
import type { User, LoginCredentials, RegisterData } from '@/shared/types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    return apiClient.post<User>('/auth/login', credentials)
  },

  register: async (data: RegisterData): Promise<User> => {
    // DummyJSON doesn't have a real register endpoint, so we'll simulate it
    // In a real app, this would be a POST to /auth/register
    // For now, we'll just call login with the username/password after "registering"
    return apiClient.post<User>('/auth/login', {
      username: data.username,
      password: data.password,
    })
  },

  getCurrentUser: async (token: string): Promise<User> => {
    return apiClient.get<User>('/auth/me', token)
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    return apiClient.post('/auth/refresh', { refreshToken })
  },
}
