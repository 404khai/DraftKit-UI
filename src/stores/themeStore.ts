import { defineStore } from 'pinia'

const THEME_KEY = 'draftkit_theme'

type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'light' as ThemeMode
  }),
  actions: {
    init() {
      const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null
      if (stored === 'light' || stored === 'dark') {
        this.setMode(stored)
        return
      }
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      this.setMode(prefersDark ? 'dark' : 'light')
    },
    setMode(mode: ThemeMode) {
      this.mode = mode
      localStorage.setItem(THEME_KEY, mode)
      const root = document.documentElement
      if (mode === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    },
    toggle() {
      this.setMode(this.mode === 'light' ? 'dark' : 'light')
    }
  }
})

