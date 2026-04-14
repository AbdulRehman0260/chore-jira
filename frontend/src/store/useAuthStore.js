import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setUser: (userData) => set({ user: userData }),
    setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: () => {
        set({
            user: null,
            isAuthenticated: false
        })
    }
}))