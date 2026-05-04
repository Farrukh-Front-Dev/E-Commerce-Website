import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  token: string | null
  tokenExpiry: number | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  isTokenExpired: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiry: null,

      setAuth: (user, token) => {
        // Set token expiry to 1 hour from now (realistic for JWTs)
        const expiry = Date.now() + 60 * 60 * 1000
        set({ user, token, tokenExpiry: expiry })
      },

      logout: () => {
        set({ user: null, token: null, tokenExpiry: null })
      },

      isAuthenticated: () => {
        const state = get()
        if (!state.token) return false
        
        // Check if token is expired
        if (state.tokenExpiry && Date.now() > state.tokenExpiry) {
          // Auto-logout if expired
          get().logout()
          return false
        }
        
        return true
      },

      isTokenExpired: () => {
        const expiry = get().tokenExpiry
        return expiry ? Date.now() > expiry : true
      },
    }),
    {
      name: 'auth-storage',
      version: 1,
    }
  )
)
