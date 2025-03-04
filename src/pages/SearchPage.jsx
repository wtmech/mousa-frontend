import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    albums: []
  });

  const genres = [
    'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Country',
    'Electronic', 'Jazz', 'Classical', 'Reggae',
    'Folk', 'Metal', 'Blues', 'Indie', 'Latin', 'K-Pop'
  ];

  // Simulated search results
  const mockResults = {
    tracks: [
      { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
      { id: 2, title: 'Don\'t Start Now', artist: 'Dua Lipa', duration: '3:03' },
      { id: 3, title: 'Watermelon Sugar', artist: 'Harry Styles', duration: '2:54' }
    ],
    artists: [
      { id: 1, name: 'The Weeknd', followers: '85.4M' },
      { id: 2, name: 'Dua Lipa', followers: '65.2M' },
      { id: 3, name: 'Harry Styles', followers: '70.8M' }
    ],
    albums: [
      { id: 1, title: 'After Hours', artist: 'The Weeknd', year: '2020' },
      { id: 2, title: 'Future Nostalgia', artist: 'Dua Lipa', year: '2020' },
      { id: 3, title: 'Fine Line', artist: 'Harry Styles', year: '2019' }
    ]
  };

  // Simulated search function
  const handleSearch = (query) => {
    if (!query) {
      setSearchResults({ tracks: [], artists: [], albums: [] });
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  // React to debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      {/* Search Input */}
      <div className="relative mb-8 max-w-xl">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full rounded-full py-3 pl-10 pr-4 bg-secondary border-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* When not searching, show genres */}
      {!searchQuery && (
        <div>
          <h2 className="text-xl font-bold mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {genres.map((genre, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg p-4 flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: `hsl(${index * 25}, 70%, 60%)`,
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))'
                }}
              >
                <h3 className="text-white font-bold text-lg">{genre}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div>
          {isSearching ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Tracks */}
              {searchResults.tracks.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Songs</h2>
                  <div className="bg-secondary rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="px-4 py-2 text-left">#</th>
                          <th className="px-4 py-2 text-left">Title</th>
                          <th className="px-4 py-2 text-left">Artist</th>
                          <th className="px-4 py-2 text-left">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.tracks.map((track, index) => (
                          <tr key={track.id} className="hover:bg-foreground/5 cursor-pointer">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3 font-medium">{track.title}</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              <Link
                                to={`/artists/${track.artistId}`}
                                className="hover:text-teal transition-colors"
                              >
                                {track.artist}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{track.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Artists */}
              {searchResults.artists.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Artists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.artists.map((artist) => (
                      <div key={artist.id} className="bg-secondary hover:bg-secondary/80 rounded-lg p-4 text-center transition-colors cursor-pointer">
                        <Link to={`/artists/${artist.id}`} className="block">
                          <div className="w-24 h-24 mx-auto rounded-full bg-foreground/10 flex items-center justify-center mb-3">
                            <span className="text-3xl">👤</span>
                          </div>
                          <h3 className="font-medium">{artist.name}</h3>
                          <p className="text-sm text-muted-foreground">{artist.followers} followers</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Albums */}
              {searchResults.albums.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Albums</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {searchResults.albums.map((album) => (
                      <div key={album.id} className="bg-secondary hover:bg-secondary/80 rounded-md p-3 transition-colors cursor-pointer">
                        <div className="aspect-square bg-foreground/10 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-2xl text-muted-foreground">💿</span>
                        </div>
                        <h3 className="font-medium truncate">{album.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          <Link
                            to={`/artists/${album.artistId}`}
                            className="hover:text-teal transition-colors"
                          >
                            {album.artist}
                          </Link> • {album.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;