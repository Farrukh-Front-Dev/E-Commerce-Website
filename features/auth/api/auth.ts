import { apiClient } from '@/shared/lib/api-client'
import type { User, LoginCredentials } from '@/shared/types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    return apiClient.post<User>('/auth/login', credentials)
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    
    return response.json()
  },
}
