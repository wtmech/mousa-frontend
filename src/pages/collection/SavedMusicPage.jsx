import { useState, useEffect } from 'react';
import { MdMusicNote, MdAlbum } from 'react-icons/md';

const SavedMusicPage = () => {
  // State for saved content
  const [savedContent, setSavedContent] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for saved content
    setSavedContent([
      { id: 1, title: 'Dreamscape', artist: 'Luna Ray', type: 'album', coverImage: null },
      { id: 2, title: 'Echo Chamber', artist: 'The Echomakers', type: 'album', coverImage: null },
      { id: 3, title: 'Digital Dreams', artist: 'Pixel Pulse', type: 'track', coverImage: null },
      { id: 4, title: 'Neon Nights', artist: 'Synthwave Collective', type: 'album', coverImage: null },
      { id: 5, title: 'Summer Anthem', artist: 'Beach Brigade', type: 'track', coverImage: null },
      { id: 6, title: 'Harmony', artist: 'Acoustic Assembly', type: 'album', coverImage: null },
      { id: 7, title: 'Midnight Drive', artist: 'Neon Nova', type: 'track', coverImage: null },
      { id: 8, title: 'Ethereal', artist: 'Dream Weavers', type: 'album', coverImage: null },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Saved Albums & Tracks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {savedContent.map(item => (
          <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center">
            <div className="w-12 h-12 rounded-md bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3">
              {item.type === 'album' ?
                <MdAlbum className="w-6 h-6 text-teal" /> :
                <MdMusicNote className="w-6 h-6 text-teal" />
              }
            </div>
            <div>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
              <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full mt-1 inline-block">
                {item.type === 'album' ? 'Album' : 'Track'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMusicPage;