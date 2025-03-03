import { useState, useEffect } from 'react';
import { MdPlaylistPlay } from 'react-icons/md';

const PlaylistsPage = () => {
  // State for playlists
  const [playlists, setPlaylists] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for playlists
    setPlaylists([
      { id: 1, title: 'Morning Vibes', trackCount: 24, coverImage: null },
      { id: 2, title: 'Workout Mix', trackCount: 18, coverImage: null },
      { id: 3, title: 'Chill Evening', trackCount: 32, coverImage: null },
      { id: 4, title: 'Focus Time', trackCount: 15, coverImage: null },
      { id: 5, title: 'Dinner Party', trackCount: 22, coverImage: null },
      { id: 6, title: 'Road Trip', trackCount: 40, coverImage: null },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {playlists.map(playlist => (
          <div key={playlist.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
            <div className="w-full aspect-square bg-primary/20 dark:bg-primary/30 rounded-lg mb-2 flex items-center justify-center">
              <MdPlaylistPlay className="w-8 h-8 text-primary opacity-70" />
            </div>
            <h3 className="font-semibold text-sm truncate">{playlist.title}</h3>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{playlist.trackCount} tracks</p>
          </div>
        ))}
        {/* Create Playlist Button */}
        <div className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg border-2 border-dashed border-light-text-secondary dark:border-dark-text-secondary hover:border-primary dark:hover:border-primary transition cursor-pointer flex flex-col items-center justify-center">
          <span className="text-2xl mb-1 text-light-text-secondary dark:text-dark-text-secondary">+</span>
          <span className="font-medium text-sm text-light-text-secondary dark:text-dark-text-secondary">Create Playlist</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistsPage;