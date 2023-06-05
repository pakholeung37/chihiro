import { useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'

export function useThemeEffect() {
  // set theme class to body
  const { theme } = useTheme()
  useEffect(() => {
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(theme)
  }, [theme])
}
