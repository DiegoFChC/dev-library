import { getSystemTheme, upadteDOMTheme } from '../theme/theme'
import type { Theme } from '@/types'

export function saveTheme (theme : Theme): void {
  if (typeof window === 'undefined') return
  upadteDOMTheme(theme)
  localStorage.setItem('theme', theme)
}

export function getCurrentTheme () : Theme {
  if (typeof window === 'undefined') return 'dark'
  const currentTheme = localStorage.getItem('theme') as Theme | null
  return currentTheme ?? getSystemTheme()
}