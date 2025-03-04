import { useState, useEffect } from 'react';
import { MdAlbum } from 'react-icons/md';
import HorizontalMusicCard from '../../components/ui/HorizontalMusicCard';
import PageTitle from '../../components/ui/PageTitle';

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
      <PageTitle>Purchased Music</PageTitle>

      <div className="space-y-2">
        {purchasedMusic.map(item => (
          <HorizontalMusicCard
            key={item.id}
            title={item.title}
            subtitle={item.artist}
            icon={<MdAlbum className="text-gold text-base" />}
            bgColor="gold"
            rightText={`$${item.price}`}
            badgeText={`Purchased on ${item.purchaseDate}`}
            size="medium"
            onClick={() => console.log(`Clicked on ${item.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchasedPage;