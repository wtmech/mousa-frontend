'use client'

import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Player from '../features/player/Player'
import LoginPage from '../auth/LoginPage'
import useAuthStore from '@/stores/authStore'

export default function MainLayout({ children }) {
  const { isAuthenticated, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="h-screen bg-dark-main text-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
      <Player />
    </div>
  )
}