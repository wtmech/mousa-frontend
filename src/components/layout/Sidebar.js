'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  RssSimple,
  Globe,
  Users,
  MusicNote,
  Desktop,
  Plus,
  Queue,
  FolderSimplePlus,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'
import CreatePlaylistModal from '../features/playlists/CreatePlaylistModal'
import LibrarySection from '../features/library/LibrarySection'
import { createPlaylist } from '@/services/api'

const NAV_ITEMS = [
  { icon: RssSimple, label: 'Feed', href: '/' },
  { icon: Globe, label: 'Explore', href: '/explore' },
  { icon: Users, label: 'Artists', href: '/artists' },
  { icon: MusicNote, label: 'Albums', href: '/albums' },
  { icon: Desktop, label: 'Local', href: '/local' },
]

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showText, setShowText] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const libraryRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleCreatePlaylist = async (playlistData) => {
    try {
      // Validate data
      if (!playlistData?.name?.trim()) {
        throw new Error('Playlist name is required');
      }

      // Create playlist
      await createPlaylist(playlistData);

      // Close modal first
      setShowCreateModal(false);

      // Then refresh library
      if (libraryRef.current) {
        await libraryRef.current.refresh();
      }
    } catch (error) {
      // Optionally show error to user
    }
  };

  if (!mounted) return null

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
            <CaretRight className="h-5 w-5" />
          ) : (
            <CaretLeft className="h-5 w-5" />
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

      {/* Create Button & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 py-1.5 px-2 hover:text-mousa hover:bg-white/[0.05] rounded-lg mb-3 w-full"
          title="Create New"
        >
          <Plus className="h-5 w-5 flex-shrink-0" />
          {!isMinimized && <span className="text-sm">Create</span>}
        </button>

        {showDropdown && (
          <div className={`absolute mt-1 bg-dark-player rounded-md shadow-lg py-1 z-10 border border-white/[0.05] ${
            isMinimized ? 'left-full ml-2' : 'left-0'
          } w-48`}>
            <button
              className="w-full px-4 py-2 text-xs hover:bg-white/[0.05] flex items-center space-x-2"
              onClick={() => {
                setShowDropdown(false)
                setShowCreateModal(true)
              }}
              title="Create New Playlist"
            >
              <Queue className="h-5 w-5" weight="bold" />
              <span>Create Playlist</span>
            </button>
            <button
              className="w-full px-4 py-2 text-xs hover:bg-white/[0.05] flex items-center space-x-2"
              onClick={() => {
                setShowDropdown(false)
              }}
              title="Create New Folder"
            >
              <FolderSimplePlus className="h-5 w-5" weight="bold" />
              <span>Create Folder</span>
            </button>
          </div>
        )}
      </div>

      <LibrarySection ref={libraryRef} isMinimized={isMinimized} />

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  )
}