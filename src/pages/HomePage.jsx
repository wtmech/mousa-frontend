import { useState, useEffect } from 'react';
import { MdLibraryMusic, MdAlbum } from 'react-icons/md';
import { BsMusicNote } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { HiStar, HiHeart, HiChat, HiShare } from 'react-icons/hi';

const HomePage = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([
    { id: 1, title: 'Discover Weekly', coverImage: null, description: 'Your weekly mix of fresh music' },
    { id: 2, title: 'Release Radar', coverImage: null, description: 'New releases from artists you follow' },
    { id: 3, title: 'Daily Mix 1', coverImage: null, description: 'Made for you based on your listening' },
  ]);

  const [recentlyPlayed, setRecentlyPlayed] = useState([
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', coverImage: null },
    { id: 2, title: 'Hotel California', artist: 'Eagles', coverImage: null },
    { id: 3, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', coverImage: null },
  ]);

  const [friendActivity, setFriendActivity] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      activity: 'is listening to',
      content: 'Mirrors',
      artist: 'Justin Timberlake',
      timestamp: '2 minutes ago',
      likes: 5
    },
    {
      id: 2,
      user: 'Michael Chen',
      activity: 'followed',
      content: 'Taylor Swift',
      timestamp: '15 minutes ago',
      likes: 2
    },
    {
      id: 3,
      user: 'Jamie Rodriguez',
      activity: 'added to playlist',
      content: 'Summer Vibes',
      song: 'Blinding Lights - The Weeknd',
      timestamp: '35 minutes ago',
      likes: 7
    },
  ]);

  const [artistUpdates, setArtistUpdates] = useState([
    {
      id: 1,
      artist: 'Coldplay',
      update: 'New single "Higher Power" is now available!',
      timestamp: 'Today',
      verified: true
    },
    {
      id: 2,
      artist: 'Adele',
      update: 'Just announced world tour dates for 2023',
      timestamp: 'Yesterday',
      verified: true
    },
  ]);

  return (
    <div className="pb-24">
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Feed</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">See what your friends and favorite artists are up to</p>
      </div>

      {/* Friend Activity */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaUserFriends className="mr-2 text-primary" /> Friend Activity
          </h2>
          <button className="text-sm text-primary hover:underline">See All</button>
        </div>

        <div className="space-y-4">
          {friendActivity.map((activity) => (
            <div key={activity.id} className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary font-semibold">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="font-semibold">{activity.user}</span> {activity.activity}{' '}
                    <span className="font-semibold">{activity.content}</span>
                    {activity.artist && <span> by {activity.artist}</span>}
                    {activity.song && <span> - {activity.song}</span>}
                  </p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{activity.timestamp}</p>

                  <div className="flex items-center mt-3 space-x-4">
                    <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors">
                      <HiHeart className="mr-1" /> {activity.likes}
                    </button>
                    <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors">
                      <HiChat className="mr-1" /> Comment
                    </button>
                    <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors">
                      <HiShare className="mr-1" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Updates */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <HiStar className="mr-2 text-gold" /> Artist Updates
          </h2>
          <button className="text-sm text-primary hover:underline">See All</button>
        </div>

        <div className="space-y-4">
          {artistUpdates.map((update) => (
            <div key={update.id} className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-teal font-semibold">{update.artist.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium flex items-center">
                    <span className="font-semibold">{update.artist}</span>
                    {update.verified && (
                      <span className="ml-1 text-teal">✓</span>
                    )}
                  </p>
                  <p className="mt-1">{update.update}</p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{update.timestamp}</p>

                  <div className="flex items-center mt-3 space-x-4">
                    <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors">
                      <HiHeart className="mr-1" /> Like
                    </button>
                    <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-teal transition-colors">
                      <HiShare className="mr-1" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recently Played</h2>
          <button className="text-sm text-primary hover:underline">See All</button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {recentlyPlayed.map((item) => (
            <div key={item.id} className="bg-light-bg dark:bg-dark-bg hover:bg-primary/5 dark:hover:bg-primary/10 rounded-md p-2 transition-colors cursor-pointer shadow-sm">
              <div className="aspect-square bg-light-surface dark:bg-dark-surface rounded-md mb-2 flex items-center justify-center">
                <BsMusicNote className="text-2xl text-teal" />
              </div>
              <h3 className="font-medium text-xs truncate">{item.title}</h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">For You</h2>
          <button className="text-sm text-primary hover:underline">Browse All</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-light-bg dark:bg-dark-bg hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg p-2 flex flex-col transition-colors cursor-pointer shadow-sm">
              <div className="h-12 w-12 bg-light-surface dark:bg-dark-surface rounded-md flex items-center justify-center flex-shrink-0 mx-auto mb-2">
                <MdLibraryMusic className="text-xl text-primary" />
              </div>
              <div className="text-center overflow-hidden">
                <h3 className="font-medium text-xs truncate">{playlist.title}</h3>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-clamp-1">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;