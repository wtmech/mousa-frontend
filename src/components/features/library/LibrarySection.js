'use client'

import { useEffect, useState } from 'react'
import PlaylistItem from './PlaylistItem'
import FolderItem from './FolderItem'
import { fetchPlaylists, fetchFolders } from '@/services/api'
import useAuthStore from '@/stores/authStore'

export default function LibrarySection({ isMinimized }) {
  const [playlists, setPlaylists] = useState([])
  const [folders, setFolders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    async function loadLibrary() {
      if (!isAuthenticated) return

      try {
        setIsLoading(true)
        const [playlistsData, foldersData] = await Promise.all([
          fetchPlaylists(),
          fetchFolders()
        ])
        setPlaylists(playlistsData)
        setFolders(foldersData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadLibrary()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="h-14 bg-white/[0.05] rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-gray-400 text-center py-4">
        Failed to load library
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Root level playlists */}
      {playlists
        .filter(playlist => !playlist.folder)
        .map((playlist) => (
          <PlaylistItem
            key={playlist._id}
            playlist={playlist}
            isMinimized={isMinimized}
          />
        ))}

      {/* Folders */}
      {folders.map((folder) => (
        <FolderItem
          key={folder._id}
          folder={folder}
          isMinimized={isMinimized}
        />
      ))}
    </div>
  )
}