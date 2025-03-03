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
        <div className="flex items-center mb-3">
          <MdExplore className="mr-2 text-primary text-lg" />
          <h2 className="text-xl font-semibold">For You</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {forYou.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="w-full aspect-square bg-primary/20 dark:bg-primary/30 rounded-lg mb-1 flex items-center justify-center">
                <HiMusicNote className="w-8 h-8 text-primary opacity-70" />
              </div>
              <h3 className="font-semibold text-xs truncate">{item.title}</h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-8">
        <div className="flex items-center mb-3">
          <MdAlbum className="mr-2 text-teal text-lg" />
          <h2 className="text-xl font-semibold">New Releases</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {newReleases.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="w-full aspect-square bg-teal/20 dark:bg-teal/30 rounded-lg mb-1 flex items-center justify-center">
                <FaCompactDisc className="w-8 h-8 text-teal opacity-70" />
              </div>
              <h3 className="font-semibold text-xs truncate">{item.title}</h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">{item.artist}</p>
              <p className="text-xs mt-1 text-teal">Released: {item.releaseDate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Artists Updates */}
      <section className="mb-8">
        <div className="flex items-center mb-3">
          <FaGuitar className="mr-2 text-primary text-lg" />
          <h2 className="text-xl font-semibold">Supported Artists Updates</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {artistUpdates.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex">
              <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-2">
                <FaGuitar className="text-primary text-xs" />
              </div>
              <div>
                <h3 className="font-semibold text-xs">{item.artist}</h3>
                <p className="text-xs">{item.title}</p>
                <div className="flex mt-1 items-center">
                  {item.type === 'exclusive' && (
                    <span className="text-xs bg-gold/20 text-gold px-1 py-0.5 rounded-full text-[10px]">Exclusive</span>
                  )}
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-1 text-[10px]">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column layout for Trending and Mousa Originals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Trending */}
        <section>
          <div className="flex items-center mb-3">
            <MdTrendingUp className="mr-2 text-sage text-lg" />
            <h2 className="text-xl font-semibold">Trending</h2>
          </div>
          <div className="space-y-2">
            {trending.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
                <div className="w-8 h-8 rounded-md bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-2">
                  <HiFire className="text-sage text-xs" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-xs">{item.title}</h3>
                  <p className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                </div>
                <span className="text-[10px] text-sage">{(item.plays / 1000000).toFixed(1)}M plays</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mousa Originals */}
        <section>
          <div className="flex items-center mb-3">
            <BsLightningFill className="mr-2 text-teal text-lg" />
            <h2 className="text-xl font-semibold">Mousa Originals</h2>
          </div>
          <div className="space-y-2">
            {originals.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
                <div className="w-10 h-10 rounded-md bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-2">
                  <BsLightningFill className="text-teal text-sm" />
                </div>
                <div>
                  <h3 className="font-medium text-xs">{item.title}</h3>
                  <p className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary">{item.description}</p>
                  <span className="text-[10px] bg-teal/20 text-teal px-1 py-0.5 rounded-full mt-1 inline-block">Mousa Exclusive</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Genres & Moods */}
      <section className="mb-8">
        <div className="flex items-center mb-3">
          <FaHeadphones className="mr-2 text-primary text-lg" />
          <h2 className="text-xl font-semibold">Genres & Moods</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {genres.map(genre => (
            <div
              key={genre.id}
              className="bg-light-surface dark:bg-dark-surface rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex flex-col items-center justify-center p-2 aspect-square"
            >
              <span className="text-lg mb-1">{genre.icon}</span>
              <span className="font-medium text-xs">{genre.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="mb-8">
        <div className="flex items-center mb-3">
          <MdFeaturedPlayList className="mr-2 text-gold text-lg" />
          <h2 className="text-xl font-semibold">Featured Campaigns</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg transition">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-2">
                  <FaGuitar className="text-gold text-xs" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs">{campaign.artist}</h3>
                  <p className="text-xs">{campaign.title}</p>
                </div>
              </div>
              <div className="w-full bg-light-bg dark:bg-dark-bg rounded-full h-2 mb-1">
                <div
                  className="bg-gold h-2 rounded-full"
                  style={{ width: `${(campaign.current / campaign.goal) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-light-text-secondary dark:text-dark-text-secondary">
                <span>${campaign.current} raised</span>
                <span>Goal: ${campaign.goal}</span>
              </div>
              <button className="mt-2 w-full py-1 bg-gold hover:bg-gold-hover text-white rounded-md transition text-xs">Support</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;