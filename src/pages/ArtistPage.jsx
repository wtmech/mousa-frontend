import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ArtistPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data fetch
  useEffect(() => {
    // This would be an API call in a real app
    setTimeout(() => {
      setArtist({
        id,
        name: 'The Weeknd',
        coverImage: null,
        followers: '85.4M',
        monthlyListeners: '62.3M',
        bio: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer.',
        popular: [
          { id: 1, title: 'Blinding Lights', plays: '3.2B', duration: '3:20', album: 'After Hours' },
          { id: 2, title: 'Starboy', plays: '2.4B', duration: '3:50', album: 'Starboy' },
          { id: 3, title: 'Save Your Tears', plays: '1.8B', duration: '3:35', album: 'After Hours' },
          { id: 4, title: 'The Hills', plays: '1.5B', duration: '3:41', album: 'Beauty Behind The Madness' },
          { id: 5, title: 'Call Out My Name', plays: '1.3B', duration: '3:48', album: 'My Dear Melancholy,' },
        ],
        albums: [
          { id: 1, title: 'After Hours', year: '2020', tracks: 14, coverImage: null },
          { id: 2, title: 'Starboy', year: '2016', tracks: 18, coverImage: null },
          { id: 3, title: 'Beauty Behind The Madness', year: '2015', tracks: 14, coverImage: null },
          { id: 4, title: 'Dawn FM', year: '2022', tracks: 16, coverImage: null },
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
      {/* Artist Header */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background h-64 rounded-lg"></div>

        <div className="relative pt-12 px-6 flex items-end space-x-6">
          <div className="w-48 h-48 rounded-full bg-foreground/10 shadow-lg flex items-center justify-center overflow-hidden">
            <span className="text-6xl">👨‍🎤</span>
          </div>
          <div className="mb-6">
            <span className="text-sm font-medium">ARTIST</span>
            <h1 className="text-5xl font-bold mt-2 mb-2">{artist.name}</h1>
            <div className="text-sm text-muted-foreground">
              {artist.followers} followers • {artist.monthlyListeners} monthly listeners
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mt-6 mb-8">
        <button className="btn btn-primary">
          <span className="mr-2">▶</span> Play
        </button>
        <button className="btn btn-outline">Follow</button>
        <button className="btn btn-ghost">Share</button>
      </div>

      {/* Popular Tracks */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="bg-secondary rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Album</th>
                <th className="px-4 py-2 text-left">Plays</th>
                <th className="px-4 py-2 text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {artist.popular.map((track, index) => (
                <tr key={track.id} className="hover:bg-foreground/5 cursor-pointer">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{track.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{track.album}</td>
                  <td className="px-4 py-3 text-muted-foreground">{track.plays}</td>
                  <td className="px-4 py-3 text-muted-foreground text-right">{track.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Albums */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {artist.albums.map(album => (
            <div key={album.id} className="bg-secondary hover:bg-secondary/80 rounded-md p-3 transition-colors cursor-pointer">
              <div className="aspect-square bg-foreground/10 rounded-md mb-3 flex items-center justify-center">
                <span className="text-2xl text-muted-foreground">💿</span>
              </div>
              <h3 className="font-medium truncate">{album.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{album.year} • {album.tracks} songs</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <div className="bg-secondary p-6 rounded-lg">
          <p className="text-foreground/90 leading-relaxed">{artist.bio}</p>
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;