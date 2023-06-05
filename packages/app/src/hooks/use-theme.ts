import create from 'zustand'

export type ThemeType = 'dark' | 'light' | 'system'
export const useTheme = create<{
  theme: ThemeType
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setTheme: (theme: ThemeType) => set({ theme }),
}))
