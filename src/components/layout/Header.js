'use client'

import Link from 'next/link'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="h-16 bg-dark-main px-6 flex items-center justify-between">
      {/* Left Section: Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative w-80">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-dark-header rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-mousa"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="hover:text-mousa" title="Notifications">
          <BellIcon className="h-6 w-6" />
        </button>
        <div className="w-8 h-8 rounded-full bg-mousa" title="Your Profile"></div>
      </div>
    </header>
  )
}