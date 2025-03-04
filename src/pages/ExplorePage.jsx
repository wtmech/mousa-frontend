import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePopularTracks, useAlbums, useArtists } from '../hooks/useMusic';

export default function ExplorePage() {
  const [tracksLimit, setTracksLimit] = useState(6);
  const [albumsLimit, setAlbumsLimit] = useState(4);
  const [artistsLimit, setArtistsLimit] = useState(4);

  const {
    data: popularTracks,
    isLoading: tracksLoading,
    error: tracksError
  } = usePopularTracks(tracksLimit);

  const {
    data: albums,
    isLoading: albumsLoading,
    error: albumsError
  } = useAlbums(albumsLimit);

  const {
    data: artists,
    isLoading: artistsLoading,
    error: artistsError
  } = useArtists(artistsLimit);

  const isLoading = tracksLoading || albumsLoading || artistsLoading;
  const hasError = tracksError || albumsError || artistsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
        <p className="mt-2">Failed to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Music</h1>

      {/* Popular Tracks Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Tracks</h2>
          <button
            onClick={() => setTracksLimit(prev => prev === 6 ? 12 : 6)}
            className="text-primary hover:underline"
          >
            {tracksLimit === 6 ? 'View More' : 'View Less'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTracks?.map(track => (
            <div key={track._id} className="bg-base-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="flex items-center p-4">
                <img
                  src={track.coverArt || 'https://placehold.co/200x200?text=Track'}
                  alt={track.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-semibold truncate">{track.title}</h3>
                  <p className="text-sm opacity-70 truncate">
                    {track.artist?.name || 'Unknown Artist'}
                  </p>
                  <Link
                    to={`/tracks/${track._id}`}
                    className="text-xs text-primary mt-1 inline-block hover:underline"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Albums</h2>
          <button
            onClick={() => setAlbumsLimit(prev => prev === 4 ? 8 : 4)}
            className="text-primary hover:underline"
          >
            {albumsLimit === 4 ? 'View More' : 'View Less'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums?.map(album => (
            <Link key={album._id} to={`/albums/${album._id}`}>
              <div className="bg-base-200 rounded-lg overflow-hidden shadow hover:shadow-md transition">
                <img
                  src={album.coverArt || 'https://placehold.co/300x300?text=Album'}
                  alt={album.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{album.title}</h3>
                  <p className="text-sm opacity-70 truncate">
                    {album.artist?.name || 'Unknown Artist'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Artists Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Artists</h2>
          <button
            onClick={() => setArtistsLimit(prev => prev === 4 ? 8 : 4)}
            className="text-primary hover:underline"
          >
            {artistsLimit === 4 ? 'View More' : 'View Less'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artists?.map(artist => (
            <Link key={artist._id} to={`/artists/${artist._id}`}>
              <div className="text-center p-4 hover:bg-base-200 rounded-lg transition">
                <div className="mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3">
                  <img
                    src={artist.imageUrl || 'https://placehold.co/200x200?text=Artist'}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{artist.name}</h3>
                <p className="text-xs opacity-70">
                  {artist.verified ? '✓ Verified Artist' : 'Artist'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}