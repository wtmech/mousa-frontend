import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdPlaylistPlay, MdAlbum, MdMusicNote, MdDownload, MdStarBorder, MdHistory } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { RiVipCrownFill, RiHeartFill } from 'react-icons/ri';
import CollectionCard from '../components/ui/CollectionCard';
import CollectionItemCard from '../components/ui/CollectionItemCard';

const CollectionPage = () => {
  // State for quick stats
  const [stats, setStats] = useState({
    playlists: 0,
    savedItems: 0,
    purchasedItems: 0,
    downloads: 0,
    exclusiveContent: 0,
    historyItems: 0
  });

  // State for recently added items
  const [recentItems, setRecentItems] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    setStats({
      playlists: 3,
      savedItems: 12,
      purchasedItems: 6,
      downloads: 8,
      exclusiveContent: 4,
      historyItems: 56
    });

    setRecentItems([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', type: 'album', addedDate: '2023-06-10', coverImage: null },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', type: 'track', addedDate: '2023-06-08', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', type: 'playlist', addedDate: '2023-06-05', coverImage: null },
    ]);

    setRecentActivity([
      { id: 1, action: 'Added to playlist', item: 'Higher Power', artist: 'Luna Ray', timestamp: '2 hours ago' },
      { id: 2, action: 'Purchased album', item: 'Acoustic Sessions', artist: 'The Echomakers', timestamp: '1 day ago' },
      { id: 3, action: 'Downloaded', item: 'Dreamscape', artist: 'Luna Ray', timestamp: '3 days ago' },
    ]);
  }, []);

  // Collection section items
  const collectionSections = [
    { id: 'playlists', title: 'Playlists', icon: <MdPlaylistPlay className="w-6 h-6" />, path: '/collection/playlists', color: 'primary', bgColor: 'primary', count: stats.playlists },
    { id: 'liked', title: 'Liked Music', icon: <RiHeartFill className="w-6 h-6" />, path: '/collection/liked', color: 'red', bgColor: 'red', count: stats.savedItems },
    { id: 'purchased', title: 'Purchased', icon: <FaLock className="w-5 h-5" />, path: '/collection/purchased', color: 'gold', bgColor: 'gold', count: stats.purchasedItems },
    { id: 'downloads', title: 'Downloads', icon: <MdDownload className="w-6 h-6" />, path: '/collection/downloads', color: 'primary', bgColor: 'primary', count: stats.downloads },
    { id: 'exclusive', title: 'Exclusive Content', icon: <RiVipCrownFill className="w-5 h-5" />, path: '/collection/exclusive', color: 'gold', bgColor: 'gold', count: stats.exclusiveContent },
    { id: 'history', title: 'History', icon: <MdHistory className="w-6 h-6" />, path: '/collection/history', color: 'sage', bgColor: 'sage', count: stats.historyItems },
  ];

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-2">Your Collection</h1>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">Manage your music, playlists, and more</p>

      {/* Collection Sections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {collectionSections.map(section => (
          <CollectionCard
            key={section.id}
            title={section.title}
            count={section.count}
            icon={section.icon}
            color={section.color}
            bgColor={section.bgColor}
            path={section.path}
            size="medium"
          />
        ))}
      </div>

      {/* Two-column layout for Recently Added and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recently Added */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <MdAlbum className="mr-2 text-teal" /> Recently Added
            </h2>
            <Link to="/collection/saved" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentItems.map(item => (
              <CollectionItemCard
                key={item.id}
                title={item.title}
                artist={item.artist}
                type={item.type}
                addedDate={item.addedDate}
                icon={
                  item.type === 'album' ? <MdAlbum size={22} /> :
                  item.type === 'track' ? <MdMusicNote size={22} /> :
                  <MdPlaylistPlay size={22} />
                }
                color="teal"
                onClick={() => console.log(`Clicked on ${item.title}`)}
              />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <MdStarBorder className="mr-2 text-sage" /> Recent Activity
            </h2>
            <Link to="/collection/history" className="text-sm text-primary hover:underline">View More</Link>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-4">
              {recentActivity.map(activity => (
                <li key={activity.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-3 mt-1">
                      {activity.action.includes('playlist') ? <MdPlaylistPlay className="text-sage" /> :
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
      </div>
    </div>
  );
};

export default CollectionPage;