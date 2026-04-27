import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setUser: (userData) => set({ user: userData }),
    setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: async () => {
        try {
            // Call backend to clear cookie
            await axiosInstance.post('/customers/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            // Clear local state regardless of backend call success
            set({
                user: null,
                isAuthenticated: false
            })
            // Redirect to home page
            window.location.href = '/'
        }
    }
}))