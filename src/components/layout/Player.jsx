import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiPause, HiPlay, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BiSkipPrevious, BiSkipNext, BiShuffle } from 'react-icons/bi';
import { RiHeartFill, RiRepeatFill, RiRepeatOneFill } from 'react-icons/ri';
import { useTracks } from '../../hooks/useMusic';

const Player = () => {
  // Fetch a real song from the database
  const { data: tracksData, isLoading } = useTracks(1, 1);

  // Use the first song from the database or fallback to fake data if loading
  const currentTrack = tracksData?.tracks?.[0] || null;

  // Default song data as fallback
  const defaultSongData = {
    title: "Midnight Waves",
    artist: "Luna Ray",
    artistId: "1",
    duration: 214, // 3:34 in seconds
    initialTime: 214 * 0.25, // 25% through the song
  };

  // Combine the real track data with fallback values if needed
  const songData = currentTrack ? {
    title: currentTrack.title,
    artist: currentTrack.artist?.name || 'Unknown Artist',
    artistId: currentTrack.artist?._id || 'unknown',
    albumArt: currentTrack.coverArt || currentTrack.album?.coverArt,
    duration: currentTrack.duration || defaultSongData.duration,
    initialTime: currentTrack.duration ? (currentTrack.duration * 0.25) : defaultSongData.initialTime
  } : defaultSongData;

  // State for player
  const [currentTime, setCurrentTime] = useState(songData.initialTime);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [shuffleOn, setShuffleOn] = useState(false); // Boolean for shuffle: on/off
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat once

  // Volume-related states
  const [volume, setVolume] = useState(0.5); // 0 to 1 range
  const [prevVolume, setPrevVolume] = useState(0.5); // Store volume before muting
  const [isMuted, setIsMuted] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  // Update currentTime when songData changes
  useEffect(() => {
    if (songData) {
      setCurrentTime(songData.initialTime);
    }
  }, [songData]);

  // Refs
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (currentTime / songData.duration) * 100;

  // Handle click on the progress bar
  const handleProgressBarClick = (e) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newPercentage = (offsetX / rect.width);
    const newTime = newPercentage * songData.duration;
    setCurrentTime(Math.max(0, Math.min(newTime, songData.duration)));
  };

  // Handle mouse down on the progress bar
  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleProgressBarClick(e);
  };

  // Handle mouse move while dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleProgressBarClick(e);
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Volume slider interactions
  const handleVolumeBarClick = (e) => {
    const volumeBar = volumeBarRef.current;
    if (!volumeBar) return;

    const rect = volumeBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(offsetX / rect.width, 1));
    setVolume(newVolume);

    // If we're clicking and setting a volume, we're unmuting
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Handle mouse down on the volume bar
  const handleVolumeMouseDown = (e) => {
    setIsDraggingVolume(true);
    handleVolumeBarClick(e);
  };

  // Handle mouse move while dragging volume
  const handleVolumeMouseMove = (e) => {
    if (!isDraggingVolume) return;
    handleVolumeBarClick(e);
  };

  // Handle mouse up to end volume dragging
  const handleVolumeMouseUp = () => {
    setIsDraggingVolume(false);
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  };

  // Get volume icon based on volume level and mute state
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <HiVolumeOff className="w-5 h-5" />;
    }
    return <HiVolumeUp className="w-5 h-5" />;
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Add and remove event listeners for volume dragging
  useEffect(() => {
    if (isDraggingVolume) {
      document.addEventListener('mousemove', handleVolumeMouseMove);
      document.addEventListener('mouseup', handleVolumeMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleVolumeMouseMove);
      document.removeEventListener('mouseup', handleVolumeMouseUp);
    };
  }, [isDraggingVolume]);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle shuffle on/off
  const toggleShuffle = () => {
    setShuffleOn(!shuffleOn);
  };

  // Cycle repeat mode: none -> repeat all -> repeat once -> none
  const cycleRepeatMode = () => {
    setRepeatMode((prevMode) => (prevMode + 1) % 3);
  };

  // Get repeat icon based on mode
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 1: // repeat all
        return <RiRepeatFill className="w-5 h-5" />;
      case 2: // repeat once
        return <RiRepeatOneFill className="w-5 h-5" />;
      default: // no repeat
        return <RiRepeatFill className="w-5 h-5 opacity-60" />;
    }
  };

  // Get artist initials for the placeholder
  const getArtistInitials = () => {
    if (!songData.artist) return "?";
    return songData.artist.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="h-20 bg-light-surface dark:bg-dark-surface border-t border-teal/20 dark:border-teal/20 flex items-center p-4">
      <div className="container mx-auto grid grid-cols-3 items-center">
        {/* Song Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal/20 dark:bg-teal/30 rounded shadow-md flex-shrink-0 flex items-center justify-center overflow-hidden">
            {songData.albumArt ? (
              <img src={songData.albumArt} alt={songData.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-teal text-xs font-medium">{getArtistInitials()}</span>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-sm font-medium">{isLoading ? "Loading..." : songData.title}</h4>
              <RiHeartFill className="ml-2 text-teal w-4 h-4" />
            </div>
            <Link
              to={`/artists/${songData.artistId}`}
              className="text-xs text-light-text-secondary dark:text-dark-text-secondary hover:text-teal transition-colors"
            >
              {songData.artist}
            </Link>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-3">
            {/* Shuffle Button */}
            <button
              onClick={toggleShuffle}
              className={`
                group relative
                transition-colors duration-200
                ${shuffleOn ? 'text-teal' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-teal dark:hover:text-teal'}
              `}
            >
              <div className="transform transition-transform duration-200 group-hover:scale-110">
                <BiShuffle className={`w-5 h-5 ${!shuffleOn ? 'opacity-60' : ''}`} />
              </div>
            </button>

            {/* Previous Button */}
            <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors group">
              <BiSkipPrevious className="w-6 h-6 transform transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-hover group"
            >
              {isPlaying ? (
                <HiPause className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <HiPlay className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110" />
              )}
            </button>

            {/* Next Button */}
            <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors group">
              <BiSkipNext className="w-6 h-6 transform transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Repeat Button */}
            <button
              onClick={cycleRepeatMode}
              className={`
                group relative
                transition-colors duration-200
                ${repeatMode > 0 ? 'text-teal' : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-teal dark:hover:text-teal'}
              `}
            >
              <div className="transform transition-transform duration-200 group-hover:scale-110">
                {getRepeatIcon()}
              </div>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full mt-2 flex items-center space-x-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressBarRef}
              className="flex-1 h-2 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleProgressBarClick}
              onMouseDown={handleMouseDown}
            >
              <div
                className={`h-full bg-teal ${isDragging ? '' : 'transition-all duration-300'}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal shadow-md transform -translate-x-1/2 ${isDragging ? 'scale-110' : ''}`}
                style={{ left: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {formatTime(songData.duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex justify-end items-center space-x-4">
          <button
            onClick={toggleMute}
            className="text-light-text-secondary dark:text-dark-text-secondary hover:text-teal dark:hover:text-teal group"
          >
            <div className="transform transition-transform duration-200 group-hover:scale-110">
              {getVolumeIcon()}
            </div>
          </button>
          <div
            ref={volumeBarRef}
            className="w-24 h-2 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden cursor-pointer relative"
            onClick={handleVolumeBarClick}
            onMouseDown={handleVolumeMouseDown}
          >
            <div
              className={`h-full bg-teal ${isDraggingVolume ? '' : 'transition-all duration-300'}`}
              style={{ width: `${volume * 100}%` }}
            ></div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal shadow-md transform -translate-x-1/2 ${isDraggingVolume ? 'scale-110' : ''}`}
              style={{ left: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;