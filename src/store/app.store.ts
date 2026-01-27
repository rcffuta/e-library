import { create } from 'zustand'

interface AppState {
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // UI State
  viewMode: 'grid' | 'list';
  toggleViewMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  viewMode: 'grid',
  toggleViewMode: () => set((state) => ({ 
    viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
  })),
}))