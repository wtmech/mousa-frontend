import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHeartFill, RiPlayFill, RiAddLine, RiMoreLine } from 'react-icons/ri';
import { MdMusicNote, MdAccessTime } from 'react-icons/md';
import SectionTitle from '../../components/ui/SectionTitle';
import PageTitle from '../../components/ui/PageTitle';
import axios from 'axios';

const LikedMusicPage = () => {
  // State for tracks from the liked playlist
  const [likedTracks, setLikedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent', 'title', 'artist'

  // Fetch liked music playlist
  useEffect(() => {
    const fetchLikedPlaylist = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        // First, fetch the user's data to get the liked playlist ID
        const userResponse = await axios.get('/api/auth/me', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (!userResponse.data || !userResponse.data.playlists || !userResponse.data.playlists.liked) {
          throw new Error('Liked playlist not found');
        }

        const likedPlaylistId = userResponse.data.playlists.liked;

        // Then fetch the playlist details
        const playlistResponse = await axios.get(`/api/playlists/${likedPlaylistId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        // Extract and format tracks from the playlist
        const tracks = playlistResponse.data.tracks.map(item => ({
          ...item.track,
          dateAdded: item.addedAt
        }));

        setLikedTracks(tracks || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching liked playlist:', err);
        setError('Failed to load your liked music. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedPlaylist();
  }, []);

  // Sorting function
  const getSortedTracks = () => {
    if (!likedTracks.length) return [];

    switch (sortOrder) {
      case 'title':
        return [...likedTracks].sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return [...likedTracks].sort((a, b) =>
          (a.artist?.name || 'Unknown').localeCompare(b.artist?.name || 'Unknown')
        );
      case 'recent':
      default:
        return [...likedTracks].sort((a, b) =>
          new Date(b.dateAdded || b.createdAt) - new Date(a.dateAdded || a.createdAt)
        );
    }
  };

  // Play all tracks
  const playAllTracks = () => {
    console.log('Playing all liked tracks');
    // Implementation would trigger the music player to play all tracks
  };

  const sortedTracks = getSortedTracks();

  return (
    <div className="pb-24 pt-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <PageTitle>Liked Music</PageTitle>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            {likedTracks.length} {likedTracks.length === 1 ? 'track' : 'tracks'} you've liked
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <button
            onClick={playAllTracks}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-full flex items-center mr-4"
            disabled={!likedTracks.length}
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
      ) : error ? (
        <div className="bg-red-500/10 text-red-500 p-4 mb-6 rounded-md">
          {error}
        </div>
      ) : likedTracks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">You haven't liked any tracks yet.</p>
          <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
            Browse the library and click the heart icon to add tracks to your liked music.
          </p>
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
            {sortedTracks.map((track, index) => (
              <div
                key={track._id || track.id}
                className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-light-bg dark:hover:bg-dark-bg transition-colors group"
              >
                <div className="col-span-1 text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <RiPlayFill className="hidden group-hover:block text-primary" />
                </div>
                <div className="col-span-4 flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center mr-3">
                    {track.coverArt ? (
                      <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover rounded" />
                    ) : (
                      <MdMusicNote className="text-primary" />
                    )}
                  </div>
                  <div className="truncate">
                    <div className="font-medium truncate">{track.title}</div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      Added {new Date(track.dateAdded || track.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 truncate">
                  <Link
                    to={`/artists/${track.artist?._id || track.artistId}`}
                    className="hover:text-teal transition-colors"
                  >
                    {track.artist?.name || track.artist || 'Unknown Artist'}
                  </Link>
                </div>
                <div className="col-span-3 truncate">
                  {track.album?.title || track.album || 'Unknown Album'}
                </div>
                <div className="col-span-1 flex justify-end items-center">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary mr-3">
                    {track.duration ?
                      `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` :
                      '0:00'}
                  </span>
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