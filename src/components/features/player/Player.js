'use client'

import { useState, useEffect } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  ArrowsClockwise,
  Queue,
  SpeakerHigh,
  SpeakerLow,
  SpeakerX,
  Heart
} from '@phosphor-icons/react'
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
  const [isDragging, setIsDragging] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

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

  const handleScrub = (e) => {
    const scrubber = e.currentTarget
    const rect = scrubber.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    const newProgress = Math.min(Math.max(percent, 0), 100)

    setProgress(newProgress)
    setCurrentTime((duration * newProgress) / 100)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleDrag = (e) => {
      const scrubber = document.querySelector('.progress-bar')
      const rect = scrubber.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = (x / rect.width) * 100
      const newProgress = Math.min(Math.max(percent, 0), 100)

      setProgress(newProgress)
      setCurrentTime((duration * newProgress) / 100)
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleDragEnd)

    return () => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', handleDragEnd)
    }
  }, [isDragging, duration])

  return (
    <div className="bg-dark-player border-t border-white/[0.05]">
      {/* Progress bar with times */}
      <div className="px-2 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            className="h-6 bg-transparent flex-1 group cursor-pointer progress-bar flex items-center"
            onClick={handleScrub}
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="h-1 bg-white/10 w-full relative">
              <div
                className="h-full bg-mousa relative group-hover:bg-mousa/90"
                style={{ width: `${progress}%` }}
              >
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </div>
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
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`ml-4 ${isLiked ? 'text-mousa' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className="h-5 w-5" weight={isLiked ? "fill" : "regular"} />
          </button>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">
            <Shuffle className="h-5 w-5" weight="bold" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipBack className="h-5 w-5" weight="fill" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" weight="fill" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" weight="fill" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward className="h-5 w-5" weight="fill" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <ArrowsClockwise className="h-5 w-5" weight="bold" />
          </button>
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-end space-x-4 w-1/4">
          <button className="text-gray-400 hover:text-white">
            <Queue className="h-5 w-5" weight="bold" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-white"
          >
            {isMuted || volume === 0 ? (
              <SpeakerX className="h-5 w-5" weight="fill" />
            ) : volume < 0.5 ? (
              <SpeakerLow className="h-5 w-5" weight="fill" />
            ) : (
              <SpeakerHigh className="h-5 w-5" weight="fill" />
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