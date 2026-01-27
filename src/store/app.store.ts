import { create } from 'zustand'

// Define types based on our Data Models
export type UserContext = {
  id: string;
  firstName: string;
  department: string;
  level: number;
}

interface AppState {
  // User Context
  user: UserContext | null;
  setUser: (user: UserContext) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // UI State
  viewMode: 'grid' | 'list';
  toggleViewMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  viewMode: 'grid',
  toggleViewMode: () => set((state) => ({ 
    viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
  })),
}))