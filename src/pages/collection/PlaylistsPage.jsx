import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlaylistsPage = () => {
  const [library, setLibrary] = useState({
    rootFolders: [],
    unfolderedPlaylists: [],
    likedPlaylist: [],
    totalPlaylists: 0,
    totalFolders: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        const response = await axios.get('/api/users/me/library', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setLibrary(response.data);
        setError(null);
      } catch (err) {
        console.error('Error in fetch flow:', err);
        setError('Failed to load your library. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  // Format duration from seconds to hours/minutes
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) {
      return `${mins} min`;
    }
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours} hr ${remainingMins} min`;
  };

  // Render a playlist card
  const PlaylistCard = ({ playlist }) => {
    if (!playlist) return null;

    const cardStyle = {
      backgroundColor: playlist.color || '#333'
    };

    return (
      <Link
        to={`/playlists/${playlist._id}`}
        className="block rounded-md overflow-hidden hover:scale-105 transition-transform duration-200"
      >
        <div className="aspect-square bg-secondary flex items-center justify-center rounded-md overflow-hidden" style={cardStyle}>
          {playlist.coverImage ? (
            <img src={playlist.coverImage} alt={playlist.name || 'Playlist'} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl">♪</span>
          )}
        </div>
        <div className="mt-2">
          <h3 className="font-medium truncate">{playlist.name || 'Untitled Playlist'}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDuration((playlist.stats?.totalDuration || 0))}
          </p>
        </div>
      </Link>
    );
  };

  // Render a folder with its playlists
  const FolderSection = ({ folder, level = 0 }) => {
    if (!folder) return null;

    const folderPlaylists = folder.playlists || [];
    const childFolders = folder.childFolders || [];

    return (
      <div className={`mb-6 ${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <Link
            to={`/playlists/folders/${folder._id}`}
            className="text-xl font-semibold hover:text-primary transition-colors flex items-center"
          >
            <span className="mr-2">Folder</span> {folder.name}
          </Link>
          <span className="text-sm text-muted-foreground">{folderPlaylists.length} playlists</span>
        </div>

        {folder.description && (
          <p className="text-muted-foreground mb-4">{folder.description}</p>
        )}

        {folderPlaylists.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {folderPlaylists.map(playlist => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        )}

        {childFolders.length > 0 && (
          <div className="border-l-2 border-secondary pl-4">
            {childFolders.map(childFolder => (
              <FolderSection key={childFolder._id} folder={childFolder} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Playlists</h1>

        <div className="flex space-x-3">
          <Link to="/playlists/create" className="btn btn-primary">
            Create Playlist
          </Link>
          <Link to="/playlists/folders" className="btn btn-outline">
            Manage Folders
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-8">
        <div className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">Library</span> ({library.totalPlaylists || 0} playlists)
        </div>

        {/* Root Folders */}
        {library.rootFolders?.map(folder => (
          <FolderSection key={folder._id} folder={folder} />
        ))}

        {/* Unfiled Playlists */}
        {library.unfolderedPlaylists?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">Unfiled</span> Playlists
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {library.unfolderedPlaylists.map(playlist => (
                <PlaylistCard key={playlist._id} playlist={playlist} />
              ))}
            </div>
          </div>
        )}

        {/* Liked Songs */}
        {library.likedPlaylist?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">Liked</span> Music
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {library.likedPlaylist.map(playlist => (
                <div key={playlist._id || 'liked'} className="col-span-1">
                  <Link
                    to={`/playlists/${playlist._id}`}
                    className="block rounded-md overflow-hidden hover:scale-105 transition-transform duration-200"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center rounded-md">
                      <span className="text-5xl">♥</span>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium">{playlist.name || 'Liked Music'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDuration((playlist.stats?.totalDuration || 0))}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistsPage;