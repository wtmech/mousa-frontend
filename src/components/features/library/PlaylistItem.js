'use client'

import { MusicalNoteIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function PlaylistItem({ playlist, isMinimized }) {
  if (isMinimized) {
    return (
      <Link
        href={`/playlist/${playlist._id}`}
        className="group relative block"
        title={playlist.name}
      >
        <div className="w-10 h-10 bg-dark-header rounded-lg flex items-center justify-center">
          <MusicalNoteIcon className="h-4 w-4" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/playlist/${playlist._id}`}
      className="flex items-center p-2 rounded-lg hover:bg-white/[0.05] group"
    >
      <div className="w-12 h-12 bg-dark-header rounded-lg flex items-center justify-center flex-shrink-0">
        <MusicalNoteIcon className="h-5 w-5" />
      </div>
      <div className="ml-3 min-w-0">
        <div className="text-sm truncate">{playlist.name}</div>
        <div className="text-xs text-gray-400 truncate">
          {playlist.tracks?.length || 0} tracks
        </div>
      </div>
    </Link>
  )
}