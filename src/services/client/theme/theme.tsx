import { type Theme } from '@/types'

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDark ? 'dark' : 'light'
}

export function upadteDOMTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.body.setAttribute('theme-toggle', theme)
}
