import { useState, useEffect } from 'react';
import { MdPlaylistPlay, MdAlbum, MdMusicNote, MdDownload, MdStarBorder, MdHistory } from 'react-icons/md';
import { FaLock, FaClock } from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';

const CollectionPage = () => {
  // State for each section's data
  const [playlists, setPlaylists] = useState([]);
  const [savedContent, setSavedContent] = useState([]);
  const [purchasedMusic, setPurchasedMusic] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [exclusiveContent, setExclusiveContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [listeningHistory, setListeningHistory] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for each section
    setPlaylists([
      { id: 1, title: 'Morning Vibes', trackCount: 24, coverImage: null },
      { id: 2, title: 'Workout Mix', trackCount: 18, coverImage: null },
      { id: 3, title: 'Chill Evening', trackCount: 32, coverImage: null },
    ]);

    setSavedContent([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', type: 'album', coverImage: null },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', type: 'album', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', type: 'track', coverImage: null },
    ]);

    setPurchasedMusic([
      { id: 1, title: 'Stellar Journey', artist: 'Luna Ray', purchaseDate: '2023-05-15', price: 12.99, coverImage: null },
      { id: 2, title: 'Acoustic Sessions', artist: 'The Echomakers', purchaseDate: '2023-04-22', price: 9.99, coverImage: null },
    ]);

    setDownloads([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', downloadDate: '2023-06-10', fileSize: '320MB', coverImage: null },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', downloadDate: '2023-05-28', fileSize: '280MB', coverImage: null },
    ]);

    setExclusiveContent([
      { id: 1, title: 'Studio Session', artist: 'Luna Ray', contentType: 'video', duration: '12:45', coverImage: null },
      { id: 2, title: 'Acoustic Cover', artist: 'The Echomakers', contentType: 'audio', duration: '4:32', coverImage: null },
    ]);

    setRecentActivity([
      { id: 1, action: 'Added to playlist', item: 'Higher Power', artist: 'Luna Ray', timestamp: '2 hours ago' },
      { id: 2, action: 'Purchased album', item: 'Acoustic Sessions', artist: 'The Echomakers', timestamp: '1 day ago' },
      { id: 3, action: 'Downloaded', item: 'Dreamscape', artist: 'Luna Ray', timestamp: '3 days ago' },
    ]);

    setListeningHistory([
      { id: 1, title: 'Higher Power', artist: 'Luna Ray', playedAt: '2 hours ago', coverImage: null },
      { id: 2, title: 'Echo', artist: 'The Echomakers', playedAt: '5 hours ago', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', playedAt: '8 hours ago', coverImage: null },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Your Collection</h1>

      {/* Your Playlists */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <MdPlaylistPlay className="mr-2 text-primary text-xl" />
          <h2 className="text-xl font-semibold">Your Playlists</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {playlists.map(playlist => (
            <div key={playlist.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="w-full aspect-square bg-primary/20 dark:bg-primary/30 rounded-lg mb-2 flex items-center justify-center">
                <MdPlaylistPlay className="w-12 h-12 text-primary opacity-70" />
              </div>
              <h3 className="font-semibold">{playlist.title}</h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{playlist.trackCount} tracks</p>
            </div>
          ))}
          {/* Create Playlist Button */}
          <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border-2 border-dashed border-light-text-secondary dark:border-dark-text-secondary hover:border-primary dark:hover:border-primary transition cursor-pointer flex flex-col items-center justify-center">
            <span className="text-3xl mb-2 text-light-text-secondary dark:text-dark-text-secondary">+</span>
            <span className="font-medium text-light-text-secondary dark:text-dark-text-secondary">Create Playlist</span>
          </div>
        </div>
      </section>

      {/* Saved Albums & Tracks */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <MdMusicNote className="mr-2 text-teal text-xl" />
          <h2 className="text-xl font-semibold">Saved Albums & Tracks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedContent.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
              <div className="w-16 h-16 rounded-md bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-4">
                {item.type === 'album' ?
                  <MdAlbum className="w-8 h-8 text-teal" /> :
                  <MdMusicNote className="w-8 h-8 text-teal" />
                }
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full mt-1 inline-block">
                  {item.type === 'album' ? 'Album' : 'Track'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column layout for Purchased and Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Purchased Music */}
        <section>
          <div className="flex items-center mb-4">
            <FaLock className="mr-2 text-gold text-xl" />
            <h2 className="text-xl font-semibold">Purchased Music</h2>
          </div>
          <div className="space-y-3">
            {purchasedMusic.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-3">
                    <MdAlbum className="text-gold" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                  </div>
                  <span className="text-xs font-semibold text-gold">${item.price}</span>
                </div>
                <div className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary pl-15">
                  Purchased on {item.purchaseDate}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section>
          <div className="flex items-center mb-4">
            <MdDownload className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Downloads</h2>
          </div>
          <div className="space-y-3">
            {downloads.map(item => (
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-3">
                    <MdDownload className="text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                  </div>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.fileSize}</span>
                </div>
                <div className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary pl-15">
                  Downloaded on {item.downloadDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Exclusive Content */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <RiVipCrownFill className="mr-2 text-gold text-xl" />
          <h2 className="text-xl font-semibold">Exclusive Content</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exclusiveContent.map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="flex items-center mb-2">
                <div className="w-16 h-16 rounded-md bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-4 relative">
                  {item.contentType === 'video' ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg> :
                    <MdMusicNote className="h-8 w-8 text-gold" />
                  }
                  <div className="absolute top-0 right-0 bg-gold text-white rounded-full p-1">
                    <RiVipCrownFill className="h-3 w-3" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full mr-2">
                      {item.contentType === 'video' ? 'Video' : 'Audio'}
                    </span>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                      <FaClock className="mr-1 h-3 w-3" /> {item.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-column layout for Recent Activity and History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <section>
          <div className="flex items-center mb-4">
            <MdStarBorder className="mr-2 text-teal text-xl" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-4">
              {recentActivity.map(activity => (
                <li key={activity.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3 mt-1">
                      {activity.action.includes('playlist') ? <MdPlaylistPlay className="text-teal" /> :
                       activity.action.includes('Purchased') ? <FaLock className="text-gold" /> :
                       <MdDownload className="text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {activity.item} - {activity.artist}
                      </p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Listening History */}
        <section>
          <div className="flex items-center mb-4">
            <MdHistory className="mr-2 text-sage text-xl" />
            <h2 className="text-xl font-semibold">Listening History</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-3">
              {listeningHistory.map(item => (
                <li key={item.id} className="hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg p-2 transition cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-3">
                      <MdMusicNote className="text-sage" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                    </div>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.playedAt}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 py-2 text-sm text-primary border border-primary/20 hover:bg-primary/10 rounded-md transition">
              View Full History
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollectionPage;