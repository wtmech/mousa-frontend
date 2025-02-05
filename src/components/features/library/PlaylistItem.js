'use client'

import { useState } from 'react'
import { MusicNote, Heart } from '@phosphor-icons/react'
import Link from 'next/link'
import { playlistIcons } from '@/config/playlistIcons'
import Image from 'next/image'

export default function PlaylistItem({ playlist, isMinimized }) {
  const Icon = playlist.icon ? playlistIcons[playlist.icon]?.icon : MusicNote

  const renderContent = () => {
    // Check for system playlist (Liked Songs) first
    if (playlist.isSystem) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Heart className="h-5 w-5" weight="fill" />
        </div>
      );
    }

    if (playlist.useOnlyColor) {
      return null;
    }

    if (playlist.previewImage) {
      const imageUrl = playlist.previewImage.startsWith('http')
        ? playlist.previewImage
        : `http://localhost:3001${playlist.previewImage}`;

      return (
        <Image
          src={imageUrl}
          alt={playlist.name}
          width={48}
          height={48}
          className="w-full h-full object-cover rounded-lg"
          unoptimized
        />
      );
    }

    if (playlist.useIcon && Icon) {
      return <Icon className="h-5 w-5" weight="fill" />;
    }

    // Fallback to text rendering if no preview image
    if (!isMinimized) {
      return (
        <h2 className="font-calistoga text-sm break-words text-left w-full pt-1 pl-1">
          {playlist.name}
        </h2>
      );
    }

    return (
      <h2 className="font-calistoga text-xs break-words text-left w-full pt-1 pl-1">
        {playlist.name}
      </h2>
    );
  };

  if (isMinimized) {
    return (
      <Link
        href={`/playlist/${playlist._id}`}
        className="group relative block"
        title={playlist.isSystem ? "Liked Songs" : playlist.name}
      >
        <div
          className={`w-12 h-12 bg-dark-header rounded-lg flex ${playlist.isSystem ? 'items-center justify-center' : 'flex-col items-start'}`}
          style={playlist.isSystem ? { backgroundColor: '#0D5EAF' } : (playlist.color ? { backgroundColor: playlist.color } : undefined)}
        >
          {renderContent()}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/playlist/${playlist._id}`}
      className="flex items-center p-2 rounded-lg hover:bg-white/[0.05] group"
    >
      <div
        className={`w-12 h-12 bg-dark-header rounded-lg flex-shrink-0 flex ${
          playlist.isSystem ? 'items-center justify-center' : 'flex-col items-start'
        }`}
        style={playlist.isSystem ? { backgroundColor: '#0D5EAF' } : (playlist.color ? { backgroundColor: playlist.color } : undefined)}
      >
        {renderContent()}
      </div>
      <div className="ml-3 min-w-0">
        <div className="text-sm truncate">{playlist.isSystem ? "Liked Songs" : playlist.name}</div>
        <div className="text-xs text-gray-400 truncate">
          {playlist.tracks?.length || 0} tracks
        </div>
      </div>
    </Link>
  )
}