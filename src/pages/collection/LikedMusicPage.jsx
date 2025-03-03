import { useState, useEffect } from 'react';
import { RiHeartFill, RiPlayFill, RiAddLine, RiMoreLine } from 'react-icons/ri';
import { MdMusicNote, MdAccessTime } from 'react-icons/md';

const LikedMusicPage = () => {
  // State for liked tracks
  const [likedTracks, setLikedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent', 'title', 'artist'

  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for liked tracks
      setLikedTracks([
        { id: 1, title: 'Higher Power', artist: 'Luna Ray', album: 'Dreamscape', duration: '3:45', dateAdded: '2023-06-10', coverImage: null },
        { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', album: 'Echo Chamber', duration: '4:12', dateAdded: '2023-06-08', coverImage: null },
        { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', album: 'Electronic Horizons', duration: '3:22', dateAdded: '2023-06-05', coverImage: null },
        { id: 4, title: 'Neon Nights', artist: 'Synthwave Collective', album: 'Synthwave Anthology', duration: '5:17', dateAdded: '2023-05-28', coverImage: null },
        { id: 5, title: 'Summer Anthem', artist: 'Beach Brigade', album: 'Summer Remix', duration: '3:55', dateAdded: '2023-05-20', coverImage: null },
        { id: 6, title: 'Harmony', artist: 'Acoustic Assembly', album: 'Lost in Harmony', duration: '4:30', dateAdded: '2023-05-15', coverImage: null },
        { id: 7, title: 'Midnight Drive', artist: 'Neon Nova', album: 'Night Lights', duration: '3:18', dateAdded: '2023-05-10', coverImage: null },
        { id: 8, title: 'Ethereal', artist: 'Dream Weavers', album: 'Dreamscape', duration: '4:05', dateAdded: '2023-05-05', coverImage: null },
        { id: 9, title: 'Resonance', artist: 'Luna Ray', album: 'Dreamscape', duration: '3:52', dateAdded: '2023-04-28', coverImage: null },
        { id: 10, title: 'Cascade', artist: 'The Echomakers', album: 'Echo Chamber', duration: '3:40', dateAdded: '2023-04-20', coverImage: null },
        { id: 11, title: 'Pixel Dreams', artist: 'Pixel Pulse', album: 'Electronic Horizons', duration: '4:15', dateAdded: '2023-04-15', coverImage: null },
        { id: 12, title: 'Neon Sunset', artist: 'Synthwave Collective', album: 'Synthwave Anthology', duration: '3:35', dateAdded: '2023-04-10', coverImage: null },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  // Sorting function
  const getSortedTracks = () => {
    switch (sortOrder) {
      case 'title':
        return [...likedTracks].sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return [...likedTracks].sort((a, b) => a.artist.localeCompare(b.artist));
      case 'recent':
      default:
        return [...likedTracks].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  };

  // Play all tracks
  const playAllTracks = () => {
    console.log('Playing all liked tracks');
    // Implementation would trigger the music player to play all tracks
  };

  return (
    <div className="pb-24 pt-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <RiHeartFill className="text-red-500 mr-3" /> Liked Music
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {likedTracks.length} tracks you've liked
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <button
            onClick={playAllTracks}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-full flex items-center mr-4"
          >
            <RiPlayFill className="mr-1" /> Play All
          </button>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-2 px-3 rounded-md border border-light-bg dark:border-dark-bg"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg overflow-hidden">
          {/* Tracks table header */}
          <div className="grid grid-cols-12 gap-2 p-4 border-b border-light-bg dark:border-dark-bg text-light-text-secondary dark:text-dark-text-secondary text-sm font-medium">
            <div className="col-span-1">#</div>
            <div className="col-span-4">TITLE</div>
            <div className="col-span-3">ARTIST</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-1 text-right"><MdAccessTime /></div>
          </div>

          {/* Tracks list */}
          <div className="divide-y divide-light-bg dark:divide-dark-bg">
            {getSortedTracks().map((track, index) => (
              <div
                key={track.id}
                className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-light-bg dark:hover:bg-dark-bg transition-colors group"
              >
                <div className="col-span-1 text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <RiPlayFill className="hidden group-hover:block text-primary" />
                </div>
                <div className="col-span-4 flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center mr-3">
                    <MdMusicNote className="text-primary" />
                  </div>
                  <div className="truncate">
                    <div className="font-medium truncate">{track.title}</div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      Added {track.dateAdded}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 truncate">{track.artist}</div>
                <div className="col-span-3 truncate">{track.album}</div>
                <div className="col-span-1 flex justify-end items-center">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary mr-3">{track.duration}</span>
                  <div className="relative group">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-light-text-secondary dark:text-dark-text-secondary hover:text-primary">
                      <RiMoreLine />
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedMusicPage;