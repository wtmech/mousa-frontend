import { useState, useEffect } from 'react';
import { MdExplore, MdTrendingUp, MdAlbum, MdFeaturedPlayList } from 'react-icons/md';
import { HiFire, HiMusicNote } from 'react-icons/hi';
import { FaGuitar, FaHeadphones, FaCompactDisc } from 'react-icons/fa';
import { BsLightningFill } from 'react-icons/bs';

const DiscoverPage = () => {
  // State for each section's data
  const [forYou, setForYou] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [artistUpdates, setArtistUpdates] = useState([]);
  const [trending, setTrending] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for each section
    setForYou([
      { id: 1, title: 'Daily Mix 1', artist: 'Based on your listening', coverImage: null },
      { id: 2, title: 'Discover Weekly', artist: 'Refreshed every Monday', coverImage: null },
      { id: 3, title: 'Your Top Mixes', artist: 'Your favorites', coverImage: null },
      { id: 4, title: 'Recommended Radio', artist: 'Similar to what you like', coverImage: null },
    ]);

    setNewReleases([
      { id: 1, title: 'Higher Power', artist: 'Luna Ray', coverImage: null, releaseDate: '2023-06-15' },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', coverImage: null, releaseDate: '2023-06-10' },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', coverImage: null, releaseDate: '2023-06-05' },
    ]);

    setArtistUpdates([
      { id: 1, artist: 'Luna Ray', type: 'post', title: 'New track coming next week!', date: '2023-06-12' },
      { id: 2, artist: 'The Echomakers', type: 'exclusive', title: 'Acoustic version of "Echo"', date: '2023-06-10' },
    ]);

    setTrending([
      { id: 1, title: 'Summer Anthem', artist: 'Beach Brigade', coverImage: null, plays: 1245000 },
      { id: 2, title: 'Midnight Drive', artist: 'Neon Nova', coverImage: null, plays: 987000 },
      { id: 3, title: 'Lost Time', artist: 'Chronos', coverImage: null, plays: 876000 },
    ]);

    setOriginals([
      { id: 1, title: 'Mousa Sessions: Luna Ray', description: 'Live performance', coverImage: null },
      { id: 2, title: 'Rising Stars Playlist', description: 'Curated new talent', coverImage: null },
    ]);

    setGenres([
      { id: 1, name: 'Indie', icon: '🎸' },
      { id: 2, name: 'Electronic', icon: '🎧' },
      { id: 3, name: 'Hip-Hop', icon: '🎤' },
      { id: 4, name: 'Rock', icon: '🤘' },
      { id: 5, name: 'Chill', icon: '😌' },
      { id: 6, name: 'Workout', icon: '💪' },
    ]);

    setRecentlyPlayed([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', lastPlayed: '1 hour ago', coverImage: null },
      { id: 2, title: 'Echoes', artist: 'The Echomakers', lastPlayed: '3 hours ago', coverImage: null },
    ]);

    setCampaigns([
      { id: 1, artist: 'Luna Ray', title: 'Studio Album Fundraiser', goal: 5000, current: 3750 },
      { id: 2, artist: 'The Echomakers', title: 'Tour Support', goal: 10000, current: 6200 },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Discover</h1>

      {/* For You */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <MdExplore className="mr-2 text-primary text-xl" />
          <h2 className="text-xl font-semibold">For You</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {forYou.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="w-full aspect-square bg-primary/20 dark:bg-primary/30 rounded-lg mb-2 flex items-center justify-center">
                <HiMusicNote className="w-12 h-12 text-primary opacity-70" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <MdAlbum className="mr-2 text-teal text-xl" />
          <h2 className="text-xl font-semibold">New Releases</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {newReleases.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="w-full aspect-square bg-teal/20 dark:bg-teal/30 rounded-lg mb-2 flex items-center justify-center">
                <FaCompactDisc className="w-12 h-12 text-teal opacity-70" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
              <p className="text-xs mt-1 text-teal">Released: {item.releaseDate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Artists Updates */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FaGuitar className="mr-2 text-primary text-xl" />
          <h2 className="text-xl font-semibold">Supported Artists Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artistUpdates.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex">
              <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-3">
                <FaGuitar className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{item.artist}</h3>
                <p className="text-sm">{item.title}</p>
                <div className="flex mt-1 items-center">
                  {item.type === 'exclusive' && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">Exclusive</span>
                  )}
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column layout for Trending and Mousa Originals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Trending */}
        <section>
          <div className="flex items-center mb-4">
            <MdTrendingUp className="mr-2 text-sage text-xl" />
            <h2 className="text-xl font-semibold">Trending</h2>
          </div>
          <div className="space-y-3">
            {trending.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
                <div className="w-10 h-10 rounded-md bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-3">
                  <HiFire className="text-sage" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                </div>
                <span className="text-xs text-sage">{(item.plays / 1000000).toFixed(1)}M plays</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mousa Originals */}
        <section>
          <div className="flex items-center mb-4">
            <BsLightningFill className="mr-2 text-teal text-xl" />
            <h2 className="text-xl font-semibold">Mousa Originals</h2>
          </div>
          <div className="space-y-3">
            {originals.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
                <div className="w-16 h-16 rounded-md bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3">
                  <BsLightningFill className="text-teal text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.description}</p>
                  <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full mt-1 inline-block">Mousa Exclusive</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Genres & Moods */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FaHeadphones className="mr-2 text-primary text-xl" />
          <h2 className="text-xl font-semibold">Genres & Moods</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {genres.map(genre => (
            <div
              key={genre.id}
              className="bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex flex-col items-center justify-center p-4 aspect-square"
            >
              <span className="text-2xl mb-2">{genre.icon}</span>
              <span className="font-medium text-sm">{genre.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <MdFeaturedPlayList className="mr-2 text-gold text-xl" />
          <h2 className="text-xl font-semibold">Featured Campaigns</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg transition">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-3">
                  <FaGuitar className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">{campaign.artist}</h3>
                  <p className="text-sm">{campaign.title}</p>
                </div>
              </div>
              <div className="w-full bg-light-bg dark:bg-dark-bg rounded-full h-3 mb-1">
                <div
                  className="bg-gold h-3 rounded-full"
                  style={{ width: `${(campaign.current / campaign.goal) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
                <span>${campaign.current} raised</span>
                <span>Goal: ${campaign.goal}</span>
              </div>
              <button className="mt-3 w-full py-2 bg-gold hover:bg-gold-hover text-white rounded-md transition">Support</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;