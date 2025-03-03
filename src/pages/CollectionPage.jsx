import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdPlaylistPlay, MdAlbum, MdMusicNote, MdDownload, MdStarBorder, MdHistory } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { RiVipCrownFill, RiHeartFill } from 'react-icons/ri';

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
    { id: 'playlists', title: 'Playlists', icon: <MdPlaylistPlay className="w-6 h-6" />, path: '/collection/playlists', color: 'text-primary', bgColor: 'bg-primary/20', count: stats.playlists },
    { id: 'liked', title: 'Liked Music', icon: <RiHeartFill className="w-6 h-6" />, path: '/collection/liked', color: 'text-red-500', bgColor: 'bg-red-500/20', count: stats.savedItems },
    { id: 'purchased', title: 'Purchased', icon: <FaLock className="w-5 h-5" />, path: '/collection/purchased', color: 'text-gold', bgColor: 'bg-gold/20', count: stats.purchasedItems },
    { id: 'downloads', title: 'Downloads', icon: <MdDownload className="w-6 h-6" />, path: '/collection/downloads', color: 'text-primary', bgColor: 'bg-primary/20', count: stats.downloads },
    { id: 'exclusive', title: 'Exclusive Content', icon: <RiVipCrownFill className="w-5 h-5" />, path: '/collection/exclusive', color: 'text-gold', bgColor: 'bg-gold/20', count: stats.exclusiveContent },
    { id: 'history', title: 'History', icon: <MdHistory className="w-6 h-6" />, path: '/collection/history', color: 'text-sage', bgColor: 'bg-sage/20', count: stats.historyItems },
  ];

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-2">Your Collection</h1>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">Manage your music, playlists, and more</p>

      {/* Collection Sections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {collectionSections.map(section => (
          <Link to={section.path} key={section.id}>
            <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer h-full">
              <div className={`${section.bgColor} ${section.color} w-10 h-10 rounded-full flex items-center justify-center mb-3`}>
                {section.icon}
              </div>
              <h3 className="font-semibold">{section.title}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{section.count} items</p>
            </div>
          </Link>
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
              <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
                <div className="w-12 h-12 rounded-md bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3">
                  {item.type === 'album' ? <MdAlbum className="text-teal" /> :
                   item.type === 'track' ? <MdMusicNote className="text-teal" /> :
                   <MdPlaylistPlay className="text-teal" />}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                  <div className="flex mt-1 space-x-2 items-center">
                    <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      Added {item.addedDate}
                    </span>
                  </div>
                </div>
              </div>
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