import { useState, useEffect } from 'react';
import { MdDownload, MdDelete, MdFileDownload } from 'react-icons/md';
import { FaHdd } from 'react-icons/fa';

const DownloadsPage = () => {
  // State for downloads
  const [downloads, setDownloads] = useState([]);
  const [storageStats, setStorageStats] = useState({ used: 0, total: 0 });

  // Simulate fetching data
  useEffect(() => {
    // Mock data for downloads
    setDownloads([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', downloadDate: '2023-06-10', fileSize: '320MB', coverImage: null },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', downloadDate: '2023-05-28', fileSize: '280MB', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', downloadDate: '2023-05-15', fileSize: '150MB', coverImage: null },
      { id: 4, title: 'Neon Nights', artist: 'Synthwave Collective', downloadDate: '2023-04-22', fileSize: '220MB', coverImage: null },
      { id: 5, title: 'Summer Anthem', artist: 'Beach Brigade', downloadDate: '2023-04-10', fileSize: '18MB', coverImage: null },
      { id: 6, title: 'Harmony', artist: 'Acoustic Assembly', downloadDate: '2023-03-15', fileSize: '95MB', coverImage: null },
      { id: 7, title: 'Midnight Drive', artist: 'Neon Nova', downloadDate: '2023-02-28', fileSize: '175MB', coverImage: null },
      { id: 8, title: 'Ethereal', artist: 'Dream Weavers', downloadDate: '2023-02-14', fileSize: '210MB', coverImage: null },
    ]);

    // Mock storage stats
    setStorageStats({
      used: 1.47, // GB
      total: 5 // GB
    });
  }, []);

  // Calculate percentage of storage used
  const storagePercentage = (storageStats.used / storageStats.total) * 100;

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Downloads</h1>

      {/* Storage Stats */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <FaHdd className="mr-2 text-primary text-lg" />
          <h2 className="font-semibold">Storage</h2>
        </div>
        <div className="w-full bg-light-bg dark:bg-dark-bg rounded-full h-2.5 mb-2">
          <div
            className={`h-2.5 rounded-full ${storagePercentage > 85 ? 'bg-red-500' : 'bg-primary'}`}
            style={{ width: `${storagePercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span>{storageStats.used.toFixed(2)} GB used</span>
          <span>{storageStats.total} GB total</span>
        </div>
      </div>

      {/* Downloads List */}
      <div className="space-y-2">
        {downloads.map(item => (
          <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-2">
                <MdDownload className="text-primary text-base" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
              </div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.fileSize}</span>
            </div>
            <div className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary pl-12">
              Downloaded on {item.downloadDate}
            </div>
            <div className="mt-2 flex justify-end space-x-2">
              <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex items-center">
                <MdFileDownload className="mr-1" /> Listen Offline
              </button>
              <button className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded flex items-center">
                <MdDelete className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsPage;