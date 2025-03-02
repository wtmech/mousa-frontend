import { useState, useEffect } from 'react';
import { HiUser, HiCreditCard, HiBell, HiCog, HiClipboardList, HiShare, HiUserGroup } from 'react-icons/hi';
import { FaGuitar, FaMusic, FaMoneyBillWave, FaRegCreditCard, FaHistory, FaEnvelope } from 'react-icons/fa';
import { MdPrivacyTip, MdNotificationsActive, MdTune, MdOutlinePlaylistAdd } from 'react-icons/md';

const LibraryPage = () => {
  const [filter, setFilter] = useState('all');

  // State for each section's data
  const [followedArtists, setFollowedArtists] = useState([]);
  const [supportOverview, setSupportOverview] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activityHistory, setActivityHistory] = useState([]);
  const [friends, setFriends] = useState([]);

  const libraryItems = [
    { id: 1, type: 'playlist', title: 'Liked Songs', creator: 'You', count: 134, lastUpdated: '2 days ago' },
    { id: 2, type: 'playlist', title: 'Your Top 2023', creator: 'Mousa', count: 100, lastUpdated: '3 months ago' },
    { id: 3, type: 'album', title: 'Thriller', creator: 'Michael Jackson', count: 9, lastUpdated: '1 week ago' },
    { id: 4, type: 'artist', title: 'The Weeknd', creator: '', count: null, lastUpdated: '3 days ago' },
    { id: 5, type: 'playlist', title: 'Workout Mix', creator: 'You', count: 45, lastUpdated: '4 days ago' },
    { id: 6, type: 'album', title: '1989', creator: 'Taylor Swift', count: 13, lastUpdated: '2 weeks ago' },
  ];

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
  ];

  const filteredItems = filter === 'all'
    ? libraryItems
    : libraryItems.filter(item => item.type === filter.slice(0, -1));  // remove 's' from the end

  // Simulate fetching data
  useEffect(() => {
    // Mock data for each section
    setFollowedArtists([
      { id: 1, name: 'Luna Ray', isSupported: true, tier: 'Stellar Supporter', image: null },
      { id: 2, name: 'The Echomakers', isSupported: true, tier: 'Echo Chamber', image: null },
      { id: 3, name: 'Pixel Pulse', isSupported: false, image: null },
      { id: 4, name: 'Chronos', isSupported: false, image: null },
      { id: 5, name: 'Neon Nova', isSupported: false, image: null },
    ]);

    setSupportOverview({
      monthlySpendings: 15.00,
      supportedArtists: 2,
      activeSubscriptions: [
        { artistName: 'Luna Ray', tier: 'Stellar Supporter', amount: 10.00, renewDate: '2023-07-15' },
        { artistName: 'The Echomakers', tier: 'Echo Chamber', amount: 5.00, renewDate: '2023-07-22' },
      ],
      totalSpent: 120.00,
      lastPayment: '2023-06-05'
    });

    setPaymentMethods([
      { id: 1, type: 'visa', last4: '4242', expiry: '04/25', isDefault: true },
      { id: 2, type: 'mastercard', last4: '8888', expiry: '09/24', isDefault: false },
    ]);

    setNotifications([
      { id: 1, type: 'artist_update', content: 'Luna Ray posted a new exclusive track', date: '2 hours ago', isRead: false },
      { id: 2, type: 'renewal', content: 'Your subscription to The Echomakers will renew soon', date: '1 day ago', isRead: true },
      { id: 3, type: 'system', content: 'Your payment method will expire soon', date: '3 days ago', isRead: false },
    ]);

    setActivityHistory([
      { id: 1, type: 'support', content: 'Started supporting Luna Ray', date: '2023-05-15' },
      { id: 2, type: 'purchase', content: 'Purchased "Echo Chambers" album', date: '2023-05-10' },
      { id: 3, type: 'playlist', content: 'Created "Morning Vibes" playlist', date: '2023-05-05' },
    ]);

    setFriends([
      { id: 1, name: 'Alex Johnson', mutualArtists: 3, image: null },
      { id: 2, name: 'Sam Rodriguez', mutualArtists: 2, image: null },
      { id: 3, name: 'Taylor Kim', mutualArtists: 1, image: null },
    ]);
  }, []);

  // Settings categories
  const settingsCategories = [
    { id: 'account', name: 'Account', icon: <HiUser className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <MdPrivacyTip className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <MdNotificationsActive className="w-5 h-5" /> },
    { id: 'playback', name: 'Playback', icon: <FaMusic className="w-5 h-5" /> },
    { id: 'downloads', name: 'Downloads', icon: <HiShare className="w-5 h-5 transform rotate-180" /> },
  ];

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Library</h1>

      {/* Artists */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FaGuitar className="mr-2 text-primary text-xl" />
          <h2 className="text-xl font-semibold">Artists</h2>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2 text-light-text-secondary dark:text-dark-text-secondary">SUPPORTED ARTISTS</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {followedArtists.filter(a => a.isSupported).map(artist => (
              <div key={artist.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
                <div className="w-full aspect-square bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mb-3">
                  <FaGuitar className="w-8 h-8 text-primary opacity-70" />
                </div>
                <h3 className="font-semibold text-center truncate">{artist.name}</h3>
                <p className="text-xs text-center text-gold truncate">{artist.tier}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium mb-2 text-light-text-secondary dark:text-dark-text-secondary">OTHER FOLLOWED ARTISTS</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {followedArtists.filter(a => !a.isSupported).map(artist => (
              <div key={artist.id} className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
                <div className="w-full aspect-square bg-light-bg dark:bg-dark-bg rounded-full flex items-center justify-center mb-3">
                  <FaGuitar className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary opacity-70" />
                </div>
                <h3 className="font-semibold text-center truncate">{artist.name}</h3>
                <button className="w-full mt-2 text-xs py-1 bg-primary hover:bg-primary-hover text-white rounded-full transition">
                  Support
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Management and Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Support Management */}
        <section>
          <div className="flex items-center mb-4">
            <FaMoneyBillWave className="mr-2 text-gold text-xl" />
            <h2 className="text-xl font-semibold">Support Management</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-light-bg dark:border-dark-bg">
              <div>
                <h3 className="font-semibold">Monthly Spending</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Supporting {supportOverview.supportedArtists || 0} artists
                </p>
              </div>
              <span className="text-2xl font-bold text-gold">${supportOverview.monthlySpendings?.toFixed(2) || '0.00'}</span>
            </div>

            <h3 className="font-medium text-sm mb-2">Active Subscriptions</h3>
            <div className="space-y-3 mb-4">
              {supportOverview.activeSubscriptions?.map((sub, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{sub.artistName}</p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {sub.tier} • Renews {sub.renewDate}
                    </p>
                  </div>
                  <span className="font-medium text-gold">${sub.amount.toFixed(2)}/mo</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-light-bg dark:border-dark-bg">
              <div>
                <p className="font-medium">Total Spent</p>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Last payment: {supportOverview.lastPayment || 'N/A'}
                </p>
              </div>
              <span className="font-bold text-gold">${supportOverview.totalSpent?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section>
          <div className="flex items-center mb-4">
            <HiCreditCard className="mr-2 text-teal text-xl" />
            <h2 className="text-xl font-semibold">Payment Methods</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <div className="space-y-3 mb-4">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className={`p-3 rounded-lg border ${method.isDefault ? 'border-teal' : 'border-light-bg dark:border-dark-bg'} relative`}
                >
                  {method.isDefault && (
                    <span className="absolute top-2 right-2 text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  <div className="flex items-center">
                    <div className="mr-3">
                      {method.type === 'visa' ? (
                        <FaRegCreditCard className="w-8 h-8 text-blue-500" />
                      ) : (
                        <FaRegCreditCard className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{method.type} •••• {method.last4}</p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-teal hover:bg-teal-hover text-white rounded-md transition flex items-center justify-center">
              <HiCreditCard className="mr-2" /> Add Payment Method
            </button>
          </div>
        </section>
      </div>

      {/* Notification Center */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <HiBell className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Notification Center</h2>
          </div>
          <button className="text-sm text-primary">Mark all as read</button>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg">
          <div className="divide-y divide-light-bg dark:divide-dark-bg">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 flex ${!notification.isRead ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  notification.type === 'artist_update' ? 'bg-primary/20 text-primary' :
                  notification.type === 'renewal' ? 'bg-gold/20 text-gold' :
                  'bg-teal/20 text-teal'
                }`}>
                  {notification.type === 'artist_update' ? <FaGuitar className="w-5 h-5" /> :
                   notification.type === 'renewal' ? <FaMoneyBillWave className="w-5 h-5" /> :
                   <HiBell className="w-5 h-5" />}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{notification.content}</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {notification.date}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-light-bg dark:border-dark-bg">
            <button className="w-full py-2 text-sm text-primary border border-primary/20 hover:bg-primary/10 rounded-md transition">
              View All Notifications
            </button>
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <HiCog className="mr-2 text-sage text-xl" />
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {settingsCategories.map(category => (
            <div key={category.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage/20 dark:bg-sage/30 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <h3 className="font-medium text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Activity and Friends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Activity */}
        <section>
          <div className="flex items-center mb-4">
            <HiClipboardList className="mr-2 text-teal text-xl" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-4">
              {activityHistory.map(activity => (
                <li key={activity.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3 mt-1">
                      {activity.type === 'support' ? <FaMoneyBillWave className="text-gold" /> :
                       activity.type === 'purchase' ? <FaMusic className="text-primary" /> :
                       <MdOutlinePlaylistAdd className="text-teal" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.content}</p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 py-2 text-sm text-teal border border-teal/20 hover:bg-teal/10 rounded-md transition flex items-center justify-center">
              <FaHistory className="mr-2" /> View Full History
            </button>
          </div>
        </section>

        {/* Friends */}
        <section>
          <div className="flex items-center mb-4">
            <HiUserGroup className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Friends</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <div className="space-y-3 mb-4">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition cursor-pointer">
                  <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mr-3">
                    <HiUser className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {friend.mutualArtists} mutual artists
                    </p>
                  </div>
                  <button className="text-primary hover:text-primary-hover transition">
                    <FaEnvelope className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 text-sm bg-primary hover:bg-primary-hover text-white rounded-md transition">
                Find Friends
              </button>
              <button className="flex-1 py-2 text-sm text-primary border border-primary/20 hover:bg-primary/10 rounded-md transition">
                Invite
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Shareable Profile */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <HiShare className="mr-2 text-gold text-xl" />
          <h2 className="text-xl font-semibold">Shareable Profile</h2>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center mb-4 md:mb-0 md:flex-1">
              <div className="w-16 h-16 bg-gold/20 dark:bg-gold/30 rounded-full flex items-center justify-center mr-4">
                <HiUser className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">YourUsername</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Supporting {supportOverview.supportedArtists || 0} artists
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:w-1/3">
              <button className="py-2 px-4 bg-gold hover:bg-gold-hover text-white rounded-md transition flex items-center justify-center">
                <HiShare className="mr-2" /> Share Your Profile
              </button>
              <button className="py-2 px-4 text-gold border border-gold/20 hover:bg-gold/10 rounded-md transition">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-light-bg dark:border-dark-bg pt-4">
            <div className="flex flex-wrap gap-2">
              <div className="bg-light-bg dark:bg-dark-bg px-3 py-1 rounded-full text-sm">
                <span className="text-light-text-secondary dark:text-dark-text-secondary mr-2">Public playlists:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="bg-light-bg dark:bg-dark-bg px-3 py-1 rounded-full text-sm">
                <span className="text-light-text-secondary dark:text-dark-text-secondary mr-2">Followers:</span>
                <span className="font-medium">24</span>
              </div>
              <div className="bg-light-bg dark:bg-dark-bg px-3 py-1 rounded-full text-sm">
                <span className="text-light-text-secondary dark:text-dark-text-secondary mr-2">Following:</span>
                <span className="font-medium">18</span>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <p className="mb-1 text-light-text-secondary dark:text-dark-text-secondary font-medium">
                Profile URL:
              </p>
              <div className="flex items-center bg-light-bg dark:bg-dark-bg rounded-md p-2">
                <span className="flex-grow truncate">https://mousa.app/profile/yourusername</span>
                <button className="text-primary hover:text-primary-hover ml-2">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibraryPage;