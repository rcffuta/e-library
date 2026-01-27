import { create } from 'zustand'
import { AuthUser } from '@/types/app.type'


interface AuthState {
  user: AuthUser | null
  isLoading: boolean;
  isInitialized: boolean;
  
  // Simple Actions
  setUser: (user: AuthUser | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Default to true until hydrated
  isInitialized: false,
  
  setUser: (user) => set({ user, isLoading: false, isInitialized: true }),
  
  logout: () => {
    set({ user: null, isLoading: false, isInitialized: false })
    // Optional: Call server action to clear cookies here
  }
}))