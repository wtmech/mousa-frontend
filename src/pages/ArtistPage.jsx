import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  HiOutlineHeart, HiHeart, HiPlay, HiPause, HiOutlineDotsHorizontal,
  HiOutlineCalendar, HiOutlineShare, HiOutlineMusicNote, HiX, HiOutlineBadgeCheck
} from 'react-icons/hi';
import {
  RiVipCrownFill, RiAlbumLine, RiSpotifyLine, RiYoutubeLine,
  RiInstagramLine, RiTwitterXLine, RiCloseLine
} from 'react-icons/ri';
import { FaPlay, FaPause, FaRegCreditCard } from 'react-icons/fa';
import PageTitle from '../components/ui/PageTitle';
import SectionTitle from '../components/ui/SectionTitle';
import MusicCard from '../components/ui/MusicCard';
import HorizontalMusicCard from '../components/ui/HorizontalMusicCard';
import { useArtist, useArtistAlbums, useArtistTracks, useToggleLikedTrack } from '../hooks/useMusic';

const SupportTier = ({ title, price, features, recommended, onSelect }) => {
  return (
    <div
      className={`bg-light-surface dark:bg-dark-surface p-6 rounded-xl shadow-md relative ${recommended ? 'border-2 border-gold' : ''}`}
      onClick={onSelect}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white text-xs py-1 px-3 rounded-full">
          Recommended
        </span>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-2xl font-bold text-primary mb-4">${price}<span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">/month</span></p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <HiOutlineBadgeCheck className="text-teal mt-0.5 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-2.5 rounded-lg font-medium ${recommended ? 'bg-gold text-white' : 'bg-light-bg dark:bg-dark-bg hover:bg-light-bg/80 dark:hover:bg-dark-bg/80'}`}>
        Select
      </button>
    </div>
  );
};

const ArtistPage = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Fetch real artist data
  const { data, isLoading: isArtistLoading, error: artistError } = useArtist(id);
  const { data: artistTracks, isLoading: isTracksLoading } = useArtistTracks(id);
  const { data: artistAlbums, isLoading: isAlbumsLoading } = useArtistAlbums(id);
  const toggleLikedTrack = useToggleLikedTrack();

  // Get artist data from the nested response
  const artist = data?.artist;

  // Prepare albums data - directly access the albums if they're not nested
  const albums = artistAlbums?.albums || artistAlbums || [];

  // Debug log
  useEffect(() => {
    console.log('API Response:', data);
    console.log('Artist data:', artist);
    console.log('Artist tracks:', artistTracks);
    console.log('Artist albums:', artistAlbums);
    console.log('Processed albums array:', albums);
  }, [data, artist, artistTracks, artistAlbums, albums]);

  // Define combined loading state
  const isLoading = isArtistLoading || isTracksLoading || isAlbumsLoading;

  // Set default tab based on available content
  useEffect(() => {
    if (artist && !isLoading) {
      if (activeTab === 'about' && !artist.bio) {
        setActiveTab('all');
      } else if (activeTab === 'exclusive' && (!artist.exclusiveContent || artist.exclusiveContent.length === 0)) {
        setActiveTab('all');
      } else if (activeTab === 'events' && (!artist.upcomingEvents || artist.upcomingEvents.length === 0)) {
        setActiveTab('all');
      } else if (activeTab === 'support' && (!artist.supportTiers || artist.supportTiers.length === 0)) {
        setActiveTab('all');
      }
    }
  }, [artist, activeTab, isLoading]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const togglePlayTrack = (trackId) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(trackId);
    }
  };

  const toggleFavorite = (trackId) => {
    toggleLikedTrack.mutate(trackId);
  };

  const openSubscribeModal = () => {
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
  };

  const selectTier = (tier) => {
    setSelectedTier(tier);
    setIsSubscribeModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedTier(null);
  };

  const completeSubscription = (e) => {
    e.preventDefault();
    // This would send the payment info to the server in a real app
    setIsPaymentModalOpen(false);
    alert(`You are now supporting ${artist?.name} at the ${selectedTier?.title} tier!`);
  };

  // Get artist initials for profile placeholder
  const getArtistInitials = () => {
    if (!artist?.name) return "?";
    return artist.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Handle error state
  if (artistError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading artist data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Artist Header */}
      <div className="relative mb-8">
        {/* Cover Image / Background */}
        <div className="h-60 bg-gradient-to-r from-teal/30 via-primary/20 to-gold/20 rounded-lg overflow-hidden">
          {artist?.coverArt ? (
            <img src={artist.coverArt} alt={artist.name} className="w-full h-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-teal/30 via-primary/20 to-gold/20"></div>
          )}
        </div>

        {/* Artist Info Card */}
        <div className="relative mx-4 -mt-24 bg-light-surface dark:bg-dark-surface rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-teal/20 shadow-md flex items-center justify-center overflow-hidden border-4 border-light-surface dark:border-dark-surface -mt-16 mb-4 md:mb-0 md:mr-6">
              {artist?.profileImage ? (
                <img src={artist.profileImage} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-teal text-7xl">{getArtistInitials()}</span>
              )}
            </div>

            {/* Artist Info */}
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Artist</span>
                {artist?.verified && (
                  <span className="ml-2 text-teal text-sm bg-teal/10 px-2 py-0.5 rounded-full flex items-center">
                    <span className="mr-1">✓</span> Verified
                  </span>
                )}
                {artist?.isSupporting && (
                  <span className="ml-2 text-gold text-sm bg-gold/10 px-2 py-0.5 rounded-full flex items-center">
                    <RiVipCrownFill className="mr-1" /> Supporting
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{artist?.name}</h1>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {artist?.followers || '0'} followers • {artist?.monthlyListeners || '0'} monthly listeners
                <span className="mx-2">•</span>
                <span className="text-xs">{artist?.genres?.join(' • ') || 'No genres listed'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={toggleFollow}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                    isFollowing
                      ? 'bg-teal text-white hover:bg-teal-hover'
                      : 'bg-light-bg dark:bg-dark-bg hover:bg-light-bg/80 dark:hover:bg-dark-bg/80'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                {artist?.supportTiers?.length > 0 && (
                  <button
                    onClick={openSubscribeModal}
                    className="px-4 py-2 rounded-lg font-medium bg-gold text-white hover:bg-gold-hover flex items-center"
                  >
                    <RiVipCrownFill className="mr-2" />
                    Support
                  </button>
                )}
                <button className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-bg/80 dark:hover:bg-dark-bg/80">
                  <HiOutlineShare />
                </button>
                <button className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-bg/80 dark:hover:bg-dark-bg/80">
                  <HiOutlineDotsHorizontal />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 mb-6 border-b border-light-border dark:border-dark-border overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'all'
              ? 'text-teal border-b-2 border-teal'
              : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('music')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'music'
              ? 'text-teal border-b-2 border-teal'
              : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
          }`}
        >
          Music
        </button>
        {artist?.bio && (
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'about'
                ? 'text-teal border-b-2 border-teal'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            About
          </button>
        )}
        {artist?.exclusiveContent?.length > 0 && (
          <button
            onClick={() => setActiveTab('exclusive')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'exclusive'
                ? 'text-teal border-b-2 border-teal'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            Exclusive
          </button>
        )}
        {artist?.upcomingEvents?.length > 0 && (
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'events'
                ? 'text-teal border-b-2 border-teal'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            Events
          </button>
        )}
        {artist?.supportTiers?.length > 0 && (
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'support'
                ? 'text-teal border-b-2 border-teal'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            Support
          </button>
        )}
      </div>

      <div className="px-4">
        {/* Artist's Popular Tracks */}
        <div className="mt-8">
          <SectionTitle icon={<HiOutlineMusicNote className="text-teal" />}>Popular Tracks</SectionTitle>
          <div className="space-y-2">
            {artistTracks?.tracks?.map((track, index) => (
              <div
                key={track._id || index}
                className="bg-light-surface dark:bg-dark-surface hover:bg-light-bg dark:hover:bg-dark-bg p-2 rounded-lg transition-colors flex items-center"
              >
                {/* Track Number */}
                <div className="w-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
                  {index + 1}
                </div>

                {/* Play Button */}
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal/10 mr-3"
                  onClick={() => togglePlayTrack(track._id)}
                >
                  {currentlyPlaying === track._id ? (
                    <HiPause className="text-teal w-5 h-5" />
                  ) : (
                    <HiPlay className="text-teal w-5 h-5" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{track.title}</h4>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    {track.album?.title || 'Single'} • {track.plays ? `${track.plays} plays` : ''}
                  </p>
                </div>

                {/* Duration */}
                <div className="text-light-text-secondary dark:text-dark-text-secondary text-sm mx-3">
                  {track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist's Albums */}
        {albums && albums.length > 0 && (
          <div className="mt-12">
            <SectionTitle icon={<RiAlbumLine className="text-teal" />}>Albums</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {albums.map((album, index) => {
                // Skip rendering if album is undefined or missing required props
                if (!album || !album.title) {
                  console.warn(`Album at index ${index} is missing required properties`);
                  return null;
                }

                const handleAlbumClick = () => {
                  if (album._id) {
                    window.location.href = `/albums/${album._id}`;
                  }
                };

                return (
                  <MusicCard
                    key={album._id || index}
                    title={album.title}
                    subtitle={artist?.name || ''}
                    image={album.coverArt || ''}
                    link={album._id ? `/albums/${album._id}` : '#'}
                    icon={<RiAlbumLine />}
                    bgColor="teal"
                    onClick={handleAlbumClick}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;