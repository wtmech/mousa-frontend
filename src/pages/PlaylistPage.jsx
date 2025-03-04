import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch playlist data
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/playlists/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setPlaylist(response.data);
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to load playlist');
        // Fallback to mock data in development
        if (import.meta.env.DEV) {
          setPlaylist({
            _id: id,
            name: 'My Awesome Playlist',
            description: 'A collection of my favorite tracks',
            owner: { username: 'You', _id: '123' },
            coverImage: null,
            color: '#3357FF',
            folder: null,
            isPublic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            stats: {
              totalDuration: 2520, // in seconds
              followerCount: 42
            },
            tracks: [
              { _id: '1', track: { title: 'Blinding Lights', artist: { name: 'The Weeknd' }, album: { title: 'After Hours' }, duration: 200, isLiked: true } },
              { _id: '2', track: { title: 'Don\'t Start Now', artist: { name: 'Dua Lipa' }, album: { title: 'Future Nostalgia' }, duration: 183, isLiked: false } },
              { _id: '3', track: { title: 'Watermelon Sugar', artist: { name: 'Harry Styles' }, album: { title: 'Fine Line' }, duration: 174, isLiked: true } },
              { _id: '4', track: { title: 'Bad Guy', artist: { name: 'Billie Eilish' }, album: { title: 'When We All Fall Asleep' }, duration: 194, isLiked: false } },
              { _id: '5', track: { title: 'Levitating', artist: { name: 'Dua Lipa' }, album: { title: 'Future Nostalgia' }, duration: 203, isLiked: true } },
            ]
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate total duration
  const formatTotalDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) {
      return `${mins} min`;
    }
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours} hr ${remainingMins} min`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error && !playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/collection/playlists" className="text-primary hover:underline">
          Back to playlists
        </Link>
      </div>
    );
  }

  // Background gradient style with the playlist color
  const headerStyle = {
    background: playlist?.color
      ? `linear-gradient(to bottom, ${playlist.color}40, transparent)`
      : 'linear-gradient(to bottom, rgba(var(--primary) / 0.1), transparent)'
  };

  // Card style for playlist cover
  const coverStyle = {
    backgroundColor: playlist?.color || 'var(--secondary)'
  };

  return (
    <div className="pb-24">
      {/* Playlist Header with color gradient */}
      <div className="py-6 px-4 rounded-xl mb-6" style={headerStyle}>
        <div className="flex flex-col md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-48 h-48 rounded-md shadow-lg flex items-center justify-center" style={coverStyle}>
            {playlist.coverImage ? (
              <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full object-cover rounded-md" />
            ) : (
              <span className="text-6xl">🎵</span>
            )}
          </div>
          <div>
            <span className="text-sm font-medium">PLAYLIST</span>
            <h1 className="text-4xl font-bold mt-2 mb-2">{playlist.name}</h1>
            <p className="text-muted-foreground">{playlist.description}</p>
            <div className="flex items-center mt-2">
              <span className="font-medium">{playlist.owner?.username || 'Unknown User'}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-muted-foreground">
                {playlist.tracks?.length || 0} songs, {formatTotalDuration(playlist.stats?.totalDuration || 0)}
              </span>
              {playlist.folder && (
                <>
                  <span className="mx-1">•</span>
                  <span className="text-sm">
                    Folder: <Link to={`/playlists/folders/${playlist.folder._id}`} className="text-primary hover:underline">
                      {playlist.folder.name}
                    </Link>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-6 px-4">
        <button className="btn btn-primary">
          <span className="mr-2">▶</span> Play
        </button>
        <button className="btn btn-ghost">Download</button>
        <button className="btn btn-ghost">Share</button>
      </div>

      {/* Track List */}
      <div className="bg-secondary rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Album</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-center">❤️</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks && playlist.tracks.map((item, index) => (
              <tr key={item._id} className="hover:bg-foreground/5 cursor-pointer">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{item.track.title}</div>
                    <div className="text-sm text-muted-foreground">{item.track.artist.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{item.track.album.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDuration(item.track.duration)}</td>
                <td className="px-4 py-3 text-center">
                  <button className={item.track.isLiked ? 'text-primary' : 'text-muted-foreground'}>
                    {item.track.isLiked ? '❤️' : '🤍'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistPage;