import { useState, useEffect } from 'react';
import { MdMusicNote, MdFilterList } from 'react-icons/md';
import { RiVipCrownFill } from 'react-icons/ri';
import { FaClock } from 'react-icons/fa';

const ExclusiveContentPage = () => {
  // State for exclusive content and filters
  const [exclusiveContent, setExclusiveContent] = useState([]);
  const [filter, setFilter] = useState('all');
  const [supportedArtists, setSupportedArtists] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for exclusive content
    setExclusiveContent([
      { id: 1, title: 'Studio Session', artist: 'Luna Ray', contentType: 'video', duration: '12:45', releaseDate: '2023-06-10', coverImage: null },
      { id: 2, title: 'Acoustic Cover', artist: 'The Echomakers', contentType: 'audio', duration: '4:32', releaseDate: '2023-06-05', coverImage: null },
      { id: 3, title: 'Behind the Scenes', artist: 'Luna Ray', contentType: 'video', duration: '8:15', releaseDate: '2023-05-28', coverImage: null },
      { id: 4, title: 'Early Demo Track', artist: 'Pixel Pulse', contentType: 'audio', duration: '3:45', releaseDate: '2023-05-20', coverImage: null },
      { id: 5, title: 'Live Performance', artist: 'The Echomakers', contentType: 'video', duration: '22:30', releaseDate: '2023-05-15', coverImage: null },
      { id: 6, title: 'Unreleased Track', artist: 'Luna Ray', contentType: 'audio', duration: '5:12', releaseDate: '2023-05-08', coverImage: null },
      { id: 7, title: 'Interview', artist: 'Pixel Pulse', contentType: 'video', duration: '18:40', releaseDate: '2023-05-01', coverImage: null },
      { id: 8, title: 'Remix Preview', artist: 'The Echomakers', contentType: 'audio', duration: '2:30', releaseDate: '2023-04-25', coverImage: null },
    ]);

    // Mock data for supported artists
    setSupportedArtists([
      { id: 1, name: 'Luna Ray', tier: 'Premium', coverImage: null },
      { id: 2, name: 'The Echomakers', tier: 'Plus', coverImage: null },
      { id: 3, name: 'Pixel Pulse', tier: 'Standard', coverImage: null },
    ]);
  }, []);

  // Filter functions
  const filterOptions = [
    { id: 'all', label: 'All Content' },
    { id: 'audio', label: 'Audio' },
    { id: 'video', label: 'Video' },
  ];

  const filteredContent = filter === 'all'
    ? exclusiveContent
    : exclusiveContent.filter(item => item.contentType === filter);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-2">Exclusive Content</h1>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Special content from artists you support
      </p>

      {/* Filter Controls */}
      <div className="flex items-center mb-6">
        <MdFilterList className="mr-2 text-light-text-secondary dark:text-dark-text-secondary" />
        <div className="flex space-x-2">
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`px-3 py-1 rounded-full text-sm ${filter === option.id
                ? 'bg-gold text-white'
                : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Supported Artists */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <RiVipCrownFill className="mr-2 text-gold" /> Your Supported Artists
        </h2>
        <div className="flex flex-wrap gap-3">
          {supportedArtists.map(artist => (
            <div key={artist.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-3">
                <span className="text-gold font-semibold">{artist.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">{artist.name}</h3>
                <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full mt-1 inline-block">
                  {artist.tier} Tier
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredContent.map(item => (
          <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
            <div className="w-full aspect-video bg-gold/20 dark:bg-gold/30 rounded-lg mb-2 flex items-center justify-center relative">
              {item.contentType === 'video' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              ) : (
                <MdMusicNote className="h-12 w-12 text-gold" />
              )}
              <div className="absolute top-2 right-2 bg-gold text-white rounded-full p-1">
                <RiVipCrownFill className="h-4 w-4" />
              </div>
            </div>
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
            <div className="flex items-center mt-2 justify-between">
              <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                {item.contentType === 'video' ? 'Video' : 'Audio'}
              </span>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                <FaClock className="mr-1 h-3 w-3" /> {item.duration}
              </span>
            </div>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
              Released: {item.releaseDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveContentPage;