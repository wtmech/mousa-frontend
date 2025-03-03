import { useState, useEffect } from 'react';
import { MdHistory, MdMusicNote, MdPlaylistPlay, MdDownload, MdAccessTime, MdDelete } from 'react-icons/md';
import { FaLock, FaCalendarAlt } from 'react-icons/fa';
import { HiClock } from 'react-icons/hi';

const HistoryPage = () => {
  // State for history data
  const [listeningHistory, setListeningHistory] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');

  // Simulate fetching data
  useEffect(() => {
    // Mock data for listening history
    setListeningHistory([
      { id: 1, title: 'Higher Power', artist: 'Luna Ray', playedAt: '2 hours ago', coverImage: null },
      { id: 2, title: 'Echo', artist: 'The Echomakers', playedAt: '5 hours ago', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', playedAt: '8 hours ago', coverImage: null },
      { id: 4, title: 'Neon Nights', artist: 'Synthwave Collective', playedAt: '1 day ago', coverImage: null },
      { id: 5, title: 'Summer Anthem', artist: 'Beach Brigade', playedAt: '1 day ago', coverImage: null },
      { id: 6, title: 'Harmony', artist: 'Acoustic Assembly', playedAt: '2 days ago', coverImage: null },
      { id: 7, title: 'Midnight Drive', artist: 'Neon Nova', playedAt: '3 days ago', coverImage: null },
      { id: 8, title: 'Ethereal', artist: 'Dream Weavers', playedAt: '4 days ago', coverImage: null },
      { id: 9, title: 'Resonance', artist: 'Luna Ray', playedAt: '5 days ago', coverImage: null },
      { id: 10, title: 'Cascade', artist: 'The Echomakers', playedAt: '1 week ago', coverImage: null },
    ]);

    // Mock data for recent activity
    setRecentActivity([
      { id: 1, action: 'Added to playlist', item: 'Higher Power', artist: 'Luna Ray', timestamp: '2 hours ago' },
      { id: 2, action: 'Purchased album', item: 'Acoustic Sessions', artist: 'The Echomakers', timestamp: '1 day ago' },
      { id: 3, action: 'Downloaded', item: 'Dreamscape', artist: 'Luna Ray', timestamp: '3 days ago' },
      { id: 4, action: 'Liked track', item: 'Neon Nights', artist: 'Synthwave Collective', timestamp: '5 days ago' },
      { id: 5, action: 'Added to playlist', item: 'Summer Anthem', artist: 'Beach Brigade', timestamp: '1 week ago' },
      { id: 6, action: 'Shared track', item: 'Harmony', artist: 'Acoustic Assembly', timestamp: '2 weeks ago' },
    ]);
  }, []);

  // Time filter options
  const timeFilterOptions = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  // Function to filter history based on time
  const getFilteredHistory = () => {
    // In a real app, you would implement proper time filtering
    // For this mock, we'll just return all data
    return listeningHistory;
  };

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-2">History</h1>
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
        Your listening history and recent activity
      </p>

      {/* Time Filter */}
      <div className="flex items-center mb-6">
        <HiClock className="mr-2 text-light-text-secondary dark:text-dark-text-secondary" />
        <div className="flex space-x-2">
          {timeFilterOptions.map(option => (
            <button
              key={option.id}
              className={`px-3 py-1 rounded-full text-sm ${timeFilter === option.id
                ? 'bg-primary text-white'
                : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
              onClick={() => setTimeFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout for Listening History and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listening History */}
        <section>
          <div className="flex items-center mb-4">
            <MdHistory className="mr-2 text-sage text-xl" />
            <h2 className="text-xl font-semibold">Listening History</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-3">
              {getFilteredHistory().map(item => (
                <li key={item.id} className="hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg p-2 transition cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-3">
                      <MdMusicNote className="text-sage" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                        <MdAccessTime className="mr-1 text-xs" /> {item.playedAt}
                      </span>
                      <button className="mt-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 hover:underline">
                        <MdDelete className="inline mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-light-bg dark:border-dark-bg mt-4 pt-4 flex justify-between">
              <button className="text-sm text-primary hover:underline flex items-center">
                <FaCalendarAlt className="mr-1" /> View Calendar View
              </button>
              <button className="text-sm text-red-500 hover:underline flex items-center">
                <MdDelete className="mr-1" /> Clear History
              </button>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center mb-4">
            <MdHistory className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-4">
              {recentActivity.map(activity => (
                <li key={activity.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-3 mt-1">
                      {activity.action.includes('playlist') ? <MdPlaylistPlay className="text-primary" /> :
                       activity.action.includes('Purchased') ? <FaLock className="text-gold" /> :
                       activity.action.includes('Downloaded') ? <MdDownload className="text-sage" /> :
                       <MdMusicNote className="text-teal" />}
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
            <button className="w-full mt-4 py-2 text-sm text-primary border border-primary/20 hover:bg-primary/10 rounded-md transition">
              View All Activity
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryPage;