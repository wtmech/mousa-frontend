'use client'

import { useState } from 'react'
import { CaretDown, CaretRight, Folder } from '@phosphor-icons/react'
import PlaylistItem from './PlaylistItem'

export default function FolderItem({ folder, isMinimized }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isMinimized) {
    return (
      <div className="group relative block" title={folder.name}>
        <div className="w-10 h-10 bg-dark-header rounded-lg flex items-center justify-center">
          <Folder className="h-5 w-5" weight="fill" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center p-2 rounded-lg hover:bg-white/[0.05] group w-full"
      >
        <div className="w-12 h-12 bg-dark-header rounded-lg flex items-center justify-center flex-shrink-0">
          <Folder className="h-5 w-5" />
        </div>
        <div className="ml-3 min-w-0">
          <div className="text-sm truncate">{folder.name}</div>
          <div className="text-xs text-gray-400 truncate">
            {folder.playlists?.length || 0} playlists
          </div>
        </div>
        <div className="ml-2">
          {isExpanded ? (
            <CaretDown className="h-5 w-5 opacity-0 group-hover:opacity-100" />
          ) : (
            <CaretRight className="h-5 w-5 opacity-0 group-hover:opacity-100" />
          )}
        </div>
      </button>

      {isExpanded && folder.playlists?.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {folder.playlists.map(playlist => (
            <PlaylistItem
              key={playlist._id}
              playlist={playlist}
              isMinimized={isMinimized}
            />
          ))}
        </div>
      )}
    </div>
  )
}