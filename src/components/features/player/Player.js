'use client'

import { useState, useEffect } from 'react'
import {
  HeartIcon,
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
  PlayIcon,
  PauseIcon,
  ArrowsRightLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/solid'
import { fetchTrack } from '@/services/api'
import Image from 'next/image'

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(75) // Set to 75% for 3/4 full
  const [volume, setVolume] = useState(50)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0) // 0: off, 1: all, 2: one
  const [track, setTrack] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    async function loadTrack() {
      try {
        const trackData = await fetchTrack('67707945f2ad32fce16f1529')
        setTrack(trackData)
        setDuration(trackData.duration || 0)
        // Set current time to 75% of the track duration
        setCurrentTime((trackData.duration || 0) * 0.75)
      } catch (error) {
        console.error('Failed to load track:', error)
      }
    }

    loadTrack()
  }, [])

  // Helper to format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-dark-player border-t border-white/[0.05]">
      {/* Progress bar with times */}
      <div className="px-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="h-1 bg-dark-header flex-1 group cursor-pointer">
            <div
              className="h-full bg-mousa relative group-hover:bg-mousa/90"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
            </div>
          </div>
          <span className="text-xs text-gray-400 w-12">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 h-20 flex items-center justify-between">
        {/* Track info */}
        <div className="w-1/4 min-w-0 flex items-center space-x-3">
          {track?.coverArt ? (
            <Image
              src={track.coverArt}
              alt={track.title}
              width={56}  // 14 * 4 (w-14)
              height={56} // 14 * 4 (h-14)
              className="rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 bg-mousa rounded-lg flex-shrink-0" />
          )}
          <div>
            <div className="text-sm font-medium truncate">
              {track?.title || 'No track selected'}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {track?.artist?.name || 'Unknown artist'}
            </div>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 hover:text-mousa ${isShuffled ? 'text-mousa' : ''}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <ArrowsRightLeftIcon className="h-4 w-4" />
            </button>
            <button className="p-2 hover:text-mousa">
              <BackwardIcon className="h-5 w-5" />
            </button>
            <button
              className="p-2 rounded-full bg-white hover:bg-white/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <PauseIcon className="h-5 w-5 text-black" />
              ) : (
                <PlayIcon className="h-5 w-5 text-black" />
              )}
            </button>
            <button className="p-2 hover:text-mousa">
              <ForwardIcon className="h-5 w-5" />
            </button>
            <button
              className={`p-2 hover:text-mousa ${repeatMode > 0 ? 'text-mousa' : ''}`}
              onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            >
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Volume control */}
        <div className="w-1/4 flex items-center justify-end space-x-2">
          <button
            className="p-2 hover:text-mousa"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="h-5 w-5" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5" />
            )}
          </button>
          <div className="w-24 h-1 bg-dark-header rounded-full cursor-pointer">
            <div
              className="h-full bg-mousa rounded-full hover:bg-mousa/90"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}