import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import '@/styles/globals.css'
import { useThemeEffect } from '@/hooks/use-theme-effect'

export function App() {
  useThemeEffect()
  return <RouterProvider router={router}></RouterProvider>
}
