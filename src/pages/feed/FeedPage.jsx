import { useState, useEffect } from 'react';
import { FaGuitar, FaHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { RiVipCrownFill, RiMusicLine } from 'react-icons/ri';
import { HiRss } from 'react-icons/hi';
import { MdMusicNote, MdVideocam, MdImageSearch, MdPlayCircle } from 'react-icons/md';

const FeedPage = () => {
  // State for feed items
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'exclusive', 'updates', 'campaigns'

  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for feed items
      setFeedItems([
        {
          id: 1,
          type: 'exclusive',
          artist: 'Luna Ray',
          artistId: 'luna-ray',
          content: {
            type: 'video',
            title: 'Studio Session: Recording New Album',
            description: 'Exclusive behind-the-scenes look at the recording of my upcoming album "Ethereal Echoes". Thanks to all my supporters for making this possible!',
            mediaUrl: null,
            timestamp: '2 hours ago'
          },
          likes: 124,
          comments: 18,
        },
        {
          id: 2,
          type: 'update',
          artist: 'The Echomakers',
          artistId: 'echomakers',
          content: {
            type: 'text',
            title: 'Tour Announcement!',
            description: 'We\'re thrilled to announce our summer tour across 15 cities! Presale tickets available exclusively to our supporters starting tomorrow.',
            mediaUrl: null,
            timestamp: '5 hours ago'
          },
          likes: 287,
          comments: 45,
        },
        {
          id: 3,
          type: 'campaign',
          artist: 'Pixel Pulse',
          artistId: 'pixel-pulse',
          content: {
            type: 'campaign',
            title: 'Help Fund Our New Music Video',
            description: 'We\'re 75% of the way to our goal to fund an innovative music video for our latest single "Digital Dreams". Every contribution gets exclusive behind-the-scenes content!',
            progress: 75,
            goal: '$5,000',
            raised: '$3,750',
            daysLeft: 7,
            timestamp: '1 day ago'
          },
          likes: 96,
          comments: 23,
        },
        {
          id: 4,
          type: 'exclusive',
          artist: 'The Echomakers',
          artistId: 'echomakers',
          content: {
            type: 'audio',
            title: 'Acoustic Demo: "Midnight Whispers"',
            description: 'A stripped-down acoustic version of our upcoming single. Supporter exclusive content!',
            mediaUrl: null,
            timestamp: '2 days ago'
          },
          likes: 156,
          comments: 31,
        },
        {
          id: 5,
          type: 'update',
          artist: 'Luna Ray',
          artistId: 'luna-ray',
          content: {
            type: 'image',
            title: 'New Album Artwork Reveal',
            description: 'So excited to share the cover art for my upcoming album "Ethereal Echoes". What do you think?',
            mediaUrl: null,
            timestamp: '3 days ago'
          },
          likes: 312,
          comments: 54,
        },
        {
          id: 6,
          type: 'release',
          artist: 'Pixel Pulse',
          artistId: 'pixel-pulse',
          content: {
            type: 'release',
            title: 'New Single: "Digital Dreams"',
            description: 'Our latest single is now available on all platforms! Supporters got early access last week - thank you for your continued support!',
            releaseType: 'Single',
            mediaUrl: null,
            timestamp: '4 days ago'
          },
          likes: 178,
          comments: 26,
        }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter function
  const getFilteredItems = () => {
    if (filter === 'all') return feedItems;
    return feedItems.filter(item => item.type === filter);
  };

  // Handle like
  const handleLike = (id) => {
    setFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className="pb-24 pt-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <HiRss className="text-primary text-3xl mr-3" />
          <div>
            <h1 className="text-3xl font-bold">Feed</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Updates from artists you support
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === 'exclusive' ? 'bg-gold text-white' : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
            onClick={() => setFilter('exclusive')}
          >
            Exclusive
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === 'update' ? 'bg-teal text-white' : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
            onClick={() => setFilter('update')}
          >
            Updates
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${filter === 'campaign' ? 'bg-primary text-white' : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary'}`}
            onClick={() => setFilter('campaign')}
          >
            Campaigns
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {getFilteredItems().map(item => (
            <div key={item.id} className="bg-light-surface dark:bg-dark-surface rounded-lg overflow-hidden shadow-sm">
              {/* Post Header */}
              <div className="p-4 flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <FaGuitar className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center">
                    <a href={`/artists/${item.artistId}`} className="font-semibold hover:underline">{item.artist}</a>
                    {item.type === 'exclusive' && (
                      <span className="ml-2 bg-gold/20 text-gold px-2 py-0.5 rounded-full text-xs flex items-center">
                        <RiVipCrownFill className="mr-1" /> Exclusive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{item.content.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h3 className="font-semibold text-lg mb-2">{item.content.title}</h3>
                <p className="text-light-text dark:text-dark-text mb-4">{item.content.description}</p>

                {/* Content Media */}
                {item.content.type === 'video' && (
                  <div className="bg-black/10 dark:bg-white/5 h-48 md:h-72 rounded-lg flex items-center justify-center mb-4">
                    <MdVideocam className="text-5xl text-light-text-secondary dark:text-dark-text-secondary" />
                    <MdPlayCircle className="text-4xl text-primary absolute" />
                  </div>
                )}

                {item.content.type === 'audio' && (
                  <div className="bg-black/10 dark:bg-white/5 h-24 rounded-lg flex items-center justify-center mb-4">
                    <RiMusicLine className="text-4xl text-light-text-secondary dark:text-dark-text-secondary mr-2" />
                    <div className="w-3/4 h-2 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                )}

                {item.content.type === 'image' && (
                  <div className="bg-black/10 dark:bg-white/5 h-48 md:h-72 rounded-lg flex items-center justify-center mb-4">
                    <MdImageSearch className="text-5xl text-light-text-secondary dark:text-dark-text-secondary" />
                  </div>
                )}

                {item.content.type === 'campaign' && (
                  <div className="bg-black/10 dark:bg-white/5 p-4 rounded-lg flex flex-col mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{item.content.raised} of {item.content.goal}</span>
                      <span className="text-sm">{item.content.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.content.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {item.content.daysLeft} days left
                      </span>
                      <button className="text-sm text-white bg-primary px-3 py-1 rounded-full">
                        Support
                      </button>
                    </div>
                  </div>
                )}

                {item.content.type === 'release' && (
                  <div className="bg-black/10 dark:bg-white/5 p-4 rounded-lg flex items-center mb-4">
                    <div className="w-16 h-16 bg-black/20 dark:bg-white/10 rounded flex items-center justify-center mr-4">
                      <MdMusicNote className="text-3xl text-light-text-secondary dark:text-dark-text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs mb-1">{item.content.releaseType}</div>
                      <button className="text-sm text-white bg-primary px-3 py-1 rounded-full">
                        Listen Now
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-light-bg dark:border-dark-bg flex justify-between">
                <div className="flex space-x-6">
                  <button
                    className="text-light-text-secondary dark:text-dark-text-secondary flex items-center hover:text-primary transition-colors"
                    onClick={() => handleLike(item.id)}
                  >
                    <FaHeart className="mr-1" /> {item.likes}
                  </button>
                  <button className="text-light-text-secondary dark:text-dark-text-secondary flex items-center hover:text-primary transition-colors">
                    <FaRegComment className="mr-1" /> {item.comments}
                  </button>
                </div>
                <button className="text-light-text-secondary dark:text-dark-text-secondary flex items-center hover:text-primary transition-colors">
                  <FaShare className="mr-1" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;