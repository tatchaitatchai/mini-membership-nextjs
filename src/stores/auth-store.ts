import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiClient } from '@/lib/api-client'

interface User {
  id: string
  email: string
  branch: string
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      error: null,

      initAuth: () => {
        if (typeof window === 'undefined') return
        if (get().isInitialized) return
        
        set({ isInitialized: true })
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await apiClient.login(email, password)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
            error: null,
          })
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await apiClient.logout()
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: null,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true
        }
      },
    }
  )
)
