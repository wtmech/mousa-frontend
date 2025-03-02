import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data fetch
  useEffect(() => {
    // This would be an API call in a real app
    setTimeout(() => {
      setPlaylist({
        id,
        name: 'My Awesome Playlist',
        description: 'A collection of my favorite tracks',
        owner: 'You',
        coverImage: null,
        trackCount: 12,
        duration: '42 min',
        tracks: [
          { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', liked: true },
          { id: 2, title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:03', liked: false },
          { id: 3, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', liked: true },
          { id: 4, title: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep', duration: '3:14', liked: false },
          { id: 5, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', liked: true },
        ]
      });
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Playlist Header */}
      <div className="flex items-end space-x-6 mb-6">
        <div className="w-48 h-48 bg-foreground/10 rounded-md shadow-lg flex items-center justify-center">
          <span className="text-6xl text-muted-foreground">📋</span>
        </div>
        <div>
          <span className="text-sm font-medium">PLAYLIST</span>
          <h1 className="text-4xl font-bold mt-2 mb-2">{playlist.name}</h1>
          <p className="text-muted-foreground">{playlist.description}</p>
          <div className="flex items-center mt-2">
            <span className="font-medium">{playlist.owner}</span>
            <span className="mx-1">•</span>
            <span className="text-sm text-muted-foreground">{playlist.trackCount} songs, {playlist.duration}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-6">
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
            {playlist.tracks.map((track, index) => (
              <tr key={track.id} className="hover:bg-foreground/5 cursor-pointer">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{track.album}</td>
                <td className="px-4 py-3 text-muted-foreground">{track.duration}</td>
                <td className="px-4 py-3 text-center">
                  <button className={track.liked ? 'text-primary' : 'text-muted-foreground'}>
                    {track.liked ? '❤️' : '🤍'}
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