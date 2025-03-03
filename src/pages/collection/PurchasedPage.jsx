import { useState, useEffect } from 'react';
import { MdAlbum } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

const PurchasedPage = () => {
  // State for purchased music
  const [purchasedMusic, setPurchasedMusic] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for purchased music
    setPurchasedMusic([
      { id: 1, title: 'Stellar Journey', artist: 'Luna Ray', purchaseDate: '2023-05-15', price: 12.99, coverImage: null },
      { id: 2, title: 'Acoustic Sessions', artist: 'The Echomakers', purchaseDate: '2023-04-22', price: 9.99, coverImage: null },
      { id: 3, title: 'Electronic Horizons', artist: 'Pixel Pulse', purchaseDate: '2023-03-10', price: 14.99, coverImage: null },
      { id: 4, title: 'Synthwave Anthology', artist: 'Neon Nova', purchaseDate: '2023-02-28', price: 19.99, coverImage: null },
      { id: 5, title: 'Summer Remix', artist: 'Beach Brigade', purchaseDate: '2023-01-15', price: 7.99, coverImage: null },
      { id: 6, title: 'Lost in Harmony', artist: 'Acoustic Assembly', purchaseDate: '2022-12-20', price: 8.99, coverImage: null },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Purchased Music</h1>

      <div className="space-y-2">
        {purchasedMusic.map(item => (
          <div key={item.id} className="bg-light-surface dark:bg-dark-surface p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-2">
                <MdAlbum className="text-gold text-base" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.artist}</p>
              </div>
              <span className="text-xs font-semibold text-gold">${item.price}</span>
            </div>
            <div className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary pl-12">
              Purchased on {item.purchaseDate}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-light-surface dark:bg-dark-surface rounded-lg p-4">
        <div className="flex items-center mb-4">
          <FaLock className="mr-2 text-gold" />
          <h2 className="font-semibold">Purchase Summary</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Total Items</span>
            <span className="font-medium">{purchasedMusic.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Total Spent</span>
            <span className="font-semibold text-gold">
              ${purchasedMusic.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Last Purchase</span>
            <span>
              {purchasedMusic.length > 0 ? purchasedMusic.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))[0].purchaseDate : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedPage;