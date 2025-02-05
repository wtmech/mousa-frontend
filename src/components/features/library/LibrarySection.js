'use client'

import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import PlaylistItem from './PlaylistItem'
import FolderItem from './FolderItem'
import { fetchPlaylists, fetchFolders } from '@/services/api'
import useAuthStore from '@/stores/authStore'

const LibrarySection = forwardRef(({ isMinimized }, ref) => {
  const [playlists, setPlaylists] = useState([])
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      setLoading(true)
      const [playlistsData, foldersData] = await Promise.all([
        fetchPlaylists(),
        fetchFolders()
      ])
      setPlaylists(playlistsData)
      setFolders(foldersData)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Failed to refresh playlists:', err)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useImperativeHandle(ref, () => ({
    refresh
  }))

  useEffect(() => {
    refresh()
  }, [refresh])

  if (loading) {
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
      {/* Liked Songs playlist always at top */}
      {playlists
        .filter(playlist => playlist.isSystem)
        .map((playlist) => (
          <PlaylistItem
            key={playlist._id}
            playlist={playlist}
            isMinimized={isMinimized}
          />
        ))}

      {/* Regular playlists */}
      {playlists
        .filter(playlist => !playlist.isSystem && !playlist.folder)
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
})

LibrarySection.displayName = 'LibrarySection'

export default LibrarySection