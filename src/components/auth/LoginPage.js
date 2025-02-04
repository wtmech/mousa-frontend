'use client'

import { useState } from 'react'
import useAuthStore from '@/stores/authStore'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  })
  const { login, error, isLoading } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(credentials)
  }

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-dark-main flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-calistoga text-mousa">Mousa</h1>
          <p className="mt-2 text-gray-400">Sign in to continue</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="login" className="sr-only">
                Email or Username
              </label>
              <input
                id="login"
                name="login"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 bg-dark-header border border-transparent rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-1 focus:ring-mousa focus:border-mousa sm:text-sm"
                placeholder="Email or Username"
                value={credentials.login}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 bg-dark-header border border-transparent rounded-lg placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-1 focus:ring-mousa focus:border-mousa sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-mousa hover:bg-mousa/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mousa disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}