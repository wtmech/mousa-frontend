import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdExplore, MdTrendingUp, MdAlbum, MdFeaturedPlayList } from 'react-icons/md';
import { HiFire, HiMusicNote } from 'react-icons/hi';
import { FaGuitar, FaHeadphones, FaCompactDisc } from 'react-icons/fa';
import { BsLightningFill } from 'react-icons/bs';
import MusicCard from '../components/ui/MusicCard';
import HorizontalMusicCard from '../components/ui/HorizontalMusicCard';
import SectionTitle from '../components/ui/SectionTitle';
import PageTitle from '../components/ui/PageTitle';
import { useTracks } from '../hooks/useMusic';

const DiscoverPage = () => {
  // Use real tracks from DB for trending section
  const { data: tracksData, isLoading: tracksLoading, error: tracksError } = useTracks(1, 3);

  // State for each section's data
  const [forYou, setForYou] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [artistUpdates, setArtistUpdates] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [genres, setGenres] = useState([]);
  // Commenting out unused state variable to fix linter error
  // const [recentlyPlayed, setRecentlyPlayed] = useState([]);
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

    setCampaigns([
      { id: 1, artist: 'Luna Ray', title: 'Studio Album Fundraiser', goal: 5000, current: 3750 },
      { id: 2, artist: 'The Echomakers', title: 'Tour Support', goal: 10000, current: 6200 },
    ]);
  }, []);

  // Format plays for display
  const formatPlays = (plays) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M plays`;
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K plays`;
    }
    return `${plays} plays`;
  };

  return (
    <div className="pb-24 pt-2">
      <PageTitle>Discover</PageTitle>

      {/* For You */}
      <section className="mb-8">
        <SectionTitle icon={<MdExplore className="text-primary" />}>
          For You
        </SectionTitle>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {forYou.map(item => (
            <MusicCard
              key={item.id}
              title={item.title}
              subtitle={item.artist}
              icon={<HiMusicNote />}
              bgColor="primary"
              size="medium"
              onClick={() => console.log(`Clicked on ${item.title}`)}
            />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-8">
        <SectionTitle icon={<MdAlbum className="text-teal" />}>
          New Releases
        </SectionTitle>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {newReleases.map(item => (
            <MusicCard
              key={item.id}
              title={item.title}
              subtitle={item.artist}
              icon={<FaCompactDisc />}
              bgColor="teal"
              releaseDate={item.releaseDate}
              size="medium"
              onClick={() => console.log(`Clicked on ${item.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Supported Artists Updates */}
      <section className="mb-8">
        <SectionTitle icon={<FaGuitar className="text-primary" />}>
          Supported Artists Updates
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {artistUpdates.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex">
              <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-2">
                <FaGuitar className="text-primary text-xs" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xs">{item.artist}</h3>
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
          <SectionTitle icon={<MdTrendingUp className="text-sage" />}>
            Trending
          </SectionTitle>
          {tracksLoading ? (
            <div className="flex justify-center items-center h-24">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-sage"></div>
            </div>
          ) : tracksError ? (
            <div className="text-red-500 text-sm p-2">
              Failed to load trending tracks
            </div>
          ) : (
            <div className="space-y-2">
              {tracksData?.tracks.slice(0, 3).map((track) => (
                <Link key={track._id} to={`/tracks/${track._id}`}>
                  <HorizontalMusicCard
                    title={track.title}
                    subtitle={track.artist?.name || 'Unknown Artist'}
                    icon={<HiFire />}
                    bgColor="sage"
                    coverImage={track.coverArt || track.album?.coverArt}
                    rightText={formatPlays(track.plays || 0)}
                    size="small"
                  />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Mousa Originals */}
        <section>
          <SectionTitle icon={<BsLightningFill className="text-teal" />}>
            Mousa Originals
          </SectionTitle>
          <div className="space-y-2">
            {originals.map(item => (
              <HorizontalMusicCard
                key={item.id}
                title={item.title}
                subtitle={item.description}
                icon={<BsLightningFill />}
                bgColor="teal"
                badgeText="Mousa Exclusive"
                size="medium"
                onClick={() => console.log(`Clicked on original item ${item.title}`)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Genres & Moods */}
      <section className="mb-8">
        <SectionTitle icon={<FaHeadphones className="text-primary" />}>
          Genres & Moods
        </SectionTitle>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {genres.map(genre => (
            <MusicCard
              key={genre.id}
              title={genre.name}
              subtitle=""
              icon={<span className="text-lg">{genre.icon}</span>}
              bgColor="primary"
              size="small"
              centered={true}
              onClick={() => console.log(`Clicked on genre ${genre.name}`)}
            />
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="mb-8">
        <SectionTitle icon={<MdFeaturedPlayList className="text-gold" />}>
          Featured Campaigns
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg transition">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-2">
                  <FaGuitar className="text-gold text-xs" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-xs">{campaign.artist}</h3>
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