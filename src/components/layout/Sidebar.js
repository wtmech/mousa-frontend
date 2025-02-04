'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  FolderPlusIcon,
  QueueListIcon,
  RssIcon,
  GlobeAltIcon,
  UsersIcon,
  MusicalNoteIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import LibrarySection from '../features/library/LibrarySection'
import Link from 'next/link'

const NAV_ITEMS = [
  { icon: RssIcon, label: 'Feed', href: '/' },
  { icon: GlobeAltIcon, label: 'Explore', href: '/explore' },
  { icon: UsersIcon, label: 'Artists', href: '/artists' },
  { icon: MusicalNoteIcon, label: 'Albums', href: '/albums' },
  { icon: ComputerDesktopIcon, label: 'Local', href: '/local' },
]

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showText, setShowText] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleToggle = () => {
    if (!isMinimized) {
      setShowText(false)
      setTimeout(() => setIsMinimized(true), 150)
    } else {
      setIsMinimized(false)
      setTimeout(() => setShowText(true), 150)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${isMinimized ? 'w-20' : 'w-64'} bg-dark-sidebar min-h-screen ${isMinimized ? 'px-5' : 'px-6 pb-6'} transition-all duration-150 flex flex-col`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between mt-4 mb-8">
        <Link
          href="/"
          className={`flex items-center ${isMinimized ? 'justify-center w-10' : ''}`}
          title="Feed"
        >
          <h1 className={`font-calistoga text-mousa ${isMinimized ? 'text-3xl' : 'text-2xl'}`}>
            {isMinimized ? 'M' : 'Mousa'}
          </h1>
        </Link>

        <button
          onClick={handleToggle}
          className="hover:text-mousa p-1"
          title={isMinimized ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isMinimized ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center hover:text-mousa py-1.5 px-2 rounded-lg hover:bg-white/[0.05] ${isMinimized ? 'justify-center' : 'space-x-3'}`}
                title={item.label}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isMinimized && <span className="text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      <div className="border-t border-white/[0.05] mb-4" />

      {/* Playlists Section */}
      {!isMinimized && <h2 className="text-xs font-semibold mb-3 uppercase tracking-wider">Playlists</h2>}

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 py-1.5 px-2 hover:text-mousa hover:bg-white/[0.05] rounded-lg mb-3 w-full"
          title="Create New"
        >
          <PlusIcon className="h-4 w-4 flex-shrink-0" />
          {!isMinimized && <span className="text-sm">Create</span>}
        </button>

        {showDropdown && !isMinimized && (
          <div className="absolute left-0 mt-1 w-48 bg-dark-player rounded-md shadow-lg py-1 z-10 border border-white/[0.05]">
            <button
              className="w-full px-4 py-2 text-xs hover:bg-white/[0.05] flex items-center space-x-2"
              onClick={() => {
                setShowDropdown(false)
              }}
              title="Create New Playlist"
            >
              <QueueListIcon className="h-4 w-4" />
              <span>Create Playlist</span>
            </button>
            <button
              className="w-full px-4 py-2 text-xs hover:bg-white/[0.05] flex items-center space-x-2"
              onClick={() => {
                setShowDropdown(false)
              }}
              title="Create New Folder"
            >
              <FolderPlusIcon className="h-4 w-4" />
              <span>Create Folder</span>
            </button>
          </div>
        )}
      </div>

      <LibrarySection isMinimized={isMinimized} />
    </div>
  )
}