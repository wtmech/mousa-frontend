import { create } from 'zustand'
import { login as apiLogin, validateToken } from '@/services/api'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    set({ isLoading: true })
    try {
      const data = await validateToken()
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const data = await apiLogin(credentials)
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message,
        isLoading: false
      })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({
      user: null,
      isAuthenticated: false,
      error: null
    })
  },

  clearError: () => set({ error: null })
}))

export default useAuthStore