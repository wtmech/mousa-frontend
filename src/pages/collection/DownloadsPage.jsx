import { useState, useEffect } from 'react';
import { MdDownload, MdDelete, MdFileDownload } from 'react-icons/md';
import { FaHdd } from 'react-icons/fa';
import HorizontalMusicCard from '../../components/ui/HorizontalMusicCard';
import PageTitle from '../../components/ui/PageTitle';
const DownloadsPage = () => {
  // State for downloads
  const [downloads, setDownloads] = useState([]);

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
  }, []);

  return (
    <div className="pb-24 pt-2">
      <PageTitle>Downloads</PageTitle>

      {/* Downloads List */}
      <div className="space-y-2">
        {downloads.map(item => (
          <HorizontalMusicCard
            key={item.id}
            title={item.title}
            subtitle={item.artist}
            icon={<MdDownload className="text-primary text-base" />}
            bgColor="primary"
            badgeText={`Downloaded on ${item.downloadDate}`}
            size="medium"
            onClick={() => console.log(`Clicked on ${item.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default DownloadsPage;