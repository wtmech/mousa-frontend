import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGuitar, FaRegCalendarAlt, FaUsers, FaCommentAlt, FaStar } from 'react-icons/fa';
import { MdVerified, MdOutlineRecommend, MdCampaign } from 'react-icons/md';
import { RiVipCrownLine, RiVipCrownFill } from 'react-icons/ri';
import { HiHeart, HiChatAlt, HiCash, HiOutlineChevronRight } from 'react-icons/hi';

const ArtistHubPage = () => {
  // State for each section's data
  const [supportedArtists, setSupportedArtists] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [exclusiveContent, setExclusiveContent] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [interactions, setInteractions] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Mock data for each section
    setSupportedArtists([
      { id: 1, name: 'Luna Ray', supportTier: 'Stellar Supporter', monthlyAmount: 10, badgeColor: 'gold', profileImage: null },
      { id: 2, name: 'The Echomakers', supportTier: 'Echo Chamber', monthlyAmount: 5, badgeColor: 'silver', profileImage: null },
      { id: 3, name: 'Pixel Pulse', supportTier: 'Digital Friend', monthlyAmount: 3, badgeColor: 'bronze', profileImage: null },
    ]);

    setMemberships([
      {
        id: 1,
        artistName: 'Luna Ray',
        tier: 'Stellar Supporter',
        amount: 10,
        benefits: [
          'Exclusive monthly tracks',
          'Early access to releases',
          'Monthly live stream sessions',
          'Discord community access'
        ],
        renewalDate: '2023-07-15'
      },
      {
        id: 2,
        artistName: 'The Echomakers',
        tier: 'Echo Chamber',
        amount: 5,
        benefits: [
          'Exclusive behind-the-scenes content',
          'Discord community access',
          'Monthly Q&A sessions'
        ],
        renewalDate: '2023-07-22'
      },
    ]);

    setExclusiveContent([
      { id: 1, artistName: 'Luna Ray', type: 'track', title: 'Stellar Dreams (Acoustic)', date: '2023-06-10', duration: '3:45' },
      { id: 2, artistName: 'Luna Ray', type: 'video', title: 'Studio Session - New Album', date: '2023-06-05', duration: '12:30' },
      { id: 3, artistName: 'The Echomakers', type: 'post', title: 'Behind the Lyrics: Echo Chamber', date: '2023-06-08', contentPreview: 'When we started writing Echo Chamber, we wanted to capture the feeling of...' },
    ]);

    setUpcomingEvents([
      { id: 1, artistName: 'Luna Ray', type: 'Live Stream', title: 'Acoustic Set', date: '2023-06-20 19:00 EST', description: 'Monthly acoustic session for supporters' },
      { id: 2, artistName: 'The Echomakers', type: 'Album Release', title: 'Echo Chambers Deluxe', date: '2023-07-01', description: 'Early access for supporters' },
      { id: 3, artistName: 'Luna Ray', type: 'Q&A Session', title: 'Ask Me Anything', date: '2023-06-25 20:00 EST', description: 'Monthly Q&A with Luna' },
    ]);

    setRecommendations([
      { id: 1, name: 'Nova Beats', genre: 'Electronic', similarTo: 'Pixel Pulse', supportersCount: 2400, tiers: [3, 5, 10], profileImage: null },
      { id: 2, name: 'Melody Rivers', genre: 'Indie Folk', similarTo: 'Luna Ray', supportersCount: 1800, tiers: [3, 8, 15], profileImage: null },
      { id: 3, name: 'Rhythm Collective', genre: 'Jazz Fusion', similarTo: 'The Echomakers', supportersCount: 1200, tiers: [2, 5, 10], profileImage: null },
    ]);

    setCampaigns([
      {
        id: 1,
        artistName: 'Luna Ray',
        title: 'Studio Album Fundraiser',
        goal: 10000,
        current: 7500,
        endDate: '2023-07-30',
        description: 'Help fund my upcoming studio album "Stellar Journey"',
        rewards: ['Digital album', 'Signed physical copy', 'Video thanks', 'Producer credit']
      },
      {
        id: 2,
        artistName: 'The Echomakers',
        title: 'European Tour Support',
        goal: 15000,
        current: 6200,
        endDate: '2023-08-15',
        description: 'Support our first European tour',
        rewards: ['Tour updates', 'Digital tour diary', 'Video call from the road', 'Exclusive merchandise']
      },
    ]);

    setCommunityPosts([
      {
        id: 1,
        artistName: 'Luna Ray',
        date: '2 days ago',
        content: 'Just finished tracking vocals for the new album! Can\'t wait to share it with you all!',
        likes: 145,
        comments: 32
      },
      {
        id: 2,
        artistName: 'The Echomakers',
        date: '3 days ago',
        content: 'We\'re planning the set list for our upcoming European tour. Any requests from our supporters?',
        likes: 89,
        comments: 54
      },
    ]);

    setInteractions([
      { id: 1, type: 'comment', artistName: 'Luna Ray', content: 'Love the new direction!', date: '3 days ago', post: 'Studio update' },
      { id: 2, type: 'support', artistName: 'The Echomakers', content: 'Increased support to $8/month', date: '1 week ago' },
      { id: 3, type: 'reaction', artistName: 'Luna Ray', content: 'Liked exclusive track', date: '5 days ago', post: 'Stellar Dreams (Acoustic)' },
    ]);
  }, []);

  return (
    <div className="pb-24 pt-2">
      <h1 className="text-3xl font-bold mb-6">Artist Hub</h1>

      {/* Supported Artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaGuitar className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Supported Artists</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary-hover transition flex items-center">
            Manage All <HiOutlineChevronRight className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {supportedArtists.map(artist => (
            <Link
              key={artist.id}
              to={`/artists/${artist.id}`}
              className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer relative"
            >
              <div className="absolute top-3 right-3">
                <RiVipCrownFill className={`w-5 h-5 ${
                  artist.badgeColor === 'gold' ? 'text-gold' :
                  artist.badgeColor === 'silver' ? 'text-gray-400' :
                  'text-amber-700'
                }`} />
              </div>
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-3">
                <FaGuitar className="w-8 h-8 text-primary opacity-70" />
              </div>
              <h3 className="font-semibold text-center">{artist.name}</h3>
              <p className="text-xs text-center text-light-text-secondary dark:text-dark-text-secondary mb-2">{artist.supportTier}</p>
              <p className="text-sm font-semibold text-center text-primary">${artist.monthlyAmount}/month</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Membership Management */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <RiVipCrownLine className="mr-2 text-gold text-xl" />
          <h2 className="text-xl font-semibold">Membership Management</h2>
        </div>
        {memberships.map(membership => (
          <div key={membership.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-3">
                  <FaGuitar className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">{membership.artistName}</h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                    <RiVipCrownLine className="mr-1 text-gold" /> {membership.tier}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gold">${membership.amount}/month</span>
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Renews: {membership.renewalDate}</span>
              </div>
            </div>
            <div className="mt-3 pl-3 border-l-2 border-gold/20">
              <h4 className="text-sm font-medium mb-2">Your Benefits:</h4>
              <ul className="text-xs space-y-1">
                {membership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <MdVerified className="text-gold mr-2 flex-shrink-0" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-4">
              <button className="text-sm py-1.5 px-3 bg-light-bg dark:bg-dark-bg hover:bg-light-bg/80 dark:hover:bg-dark-bg/80 rounded transition">
                Change Tier
              </button>
              <button className="text-sm py-1.5 px-3 bg-gold hover:bg-gold-hover text-white rounded transition">
                Message Artist
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Exclusive Feed */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FaStar className="mr-2 text-gold text-xl" />
          <h2 className="text-xl font-semibold">Exclusive Content</h2>
        </div>
        <div className="space-y-4">
          {exclusiveContent.map(content => (
            <div key={content.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
              <div className="flex items-start">
                <div className={`w-16 h-16 rounded-md ${
                  content.type === 'track' ? 'bg-primary/20 dark:bg-primary/30' :
                  content.type === 'video' ? 'bg-teal/20 dark:bg-teal/30' :
                  'bg-sage/20 dark:bg-sage/30'
                } flex items-center justify-center mr-4`}>
                  {content.type === 'track' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  ) : content.type === 'video' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <FaCommentAlt className="h-8 w-8 text-sage" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{content.title}</h3>
                    {content.duration && (
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {content.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {content.artistName}
                  </p>
                  {content.contentPreview && (
                    <p className="text-sm mt-2 line-clamp-2">{content.contentPreview}</p>
                  )}
                  <div className="flex mt-2">
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full flex items-center">
                      <RiVipCrownFill className="mr-1 h-3 w-3" /> Exclusive
                    </span>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2">
                      {content.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Exclusives */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <FaRegCalendarAlt className="mr-2 text-teal text-xl" />
          <h2 className="text-xl font-semibold">Upcoming Exclusives</h2>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal/10 dark:bg-teal/20 rounded-md flex flex-col items-center justify-center mr-4 text-teal">
                    <span className="text-xs font-bold">{event.date.split(' ')[0].split('-')[1]}</span>
                    <span className="text-lg font-bold">{event.date.split(' ')[0].split('-')[2]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{event.artistName}</p>
                    <div className="flex mt-1">
                      <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                        {event.type}
                      </span>
                      {event.date.includes(':') && (
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2">
                          {event.date.split(' ').slice(1).join(' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-1">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-teal border border-teal/20 hover:bg-teal/10 rounded-md transition">
            View Calendar
          </button>
        </div>
      </section>

      {/* Two-column layout for Recommendations and Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Artist Recommendations */}
        <section>
          <div className="flex items-center mb-4">
            <MdOutlineRecommend className="mr-2 text-primary text-xl" />
            <h2 className="text-xl font-semibold">Recommended Artists</h2>
          </div>
          <div className="space-y-3">
            {recommendations.map(artist => (
              <div key={artist.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center mr-3">
                    <FaGuitar className="w-6 h-6 text-primary opacity-70" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {artist.genre} • {artist.supportersCount.toLocaleString()} supporters
                    </p>
                    <p className="text-xs mt-1">Similar to {artist.similarTo}</p>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  {artist.tiers.map((tier, index) => (
                    <button key={index} className="px-3 py-1 text-xs bg-primary hover:bg-primary-hover text-white rounded-full transition">
                      ${tier}/mo
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Campaigns */}
        <section>
          <div className="flex items-center mb-4">
            <MdCampaign className="mr-2 text-gold text-xl" />
            <h2 className="text-xl font-semibold">Featured Campaigns</h2>
          </div>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg transition">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center mr-3">
                    <FaGuitar className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{campaign.artistName}</h3>
                    <p className="text-sm">{campaign.title}</p>
                  </div>
                </div>
                <p className="text-xs mb-3">{campaign.description}</p>
                <div className="w-full bg-light-bg dark:bg-dark-bg rounded-full h-3 mb-1">
                  <div
                    className="bg-gold h-3 rounded-full"
                    style={{ width: `${(campaign.current / campaign.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  <span>${campaign.current} of ${campaign.goal}</span>
                  <span>Ends: {campaign.endDate}</span>
                </div>
                <button className="mt-3 w-full py-2 bg-gold hover:bg-gold-hover text-white rounded-md transition">
                  Support Campaign
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Two-column layout for Community and Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Community */}
        <section>
          <div className="flex items-center mb-4">
            <FaUsers className="mr-2 text-sage text-xl" />
            <h2 className="text-xl font-semibold">Community</h2>
          </div>
          <div className="space-y-4">
            {communityPosts.map(post => (
              <div key={post.id} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-sage/20 dark:bg-sage/30 flex items-center justify-center mr-3">
                    <FaGuitar className="text-sage" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{post.artistName}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{post.date}</p>
                  </div>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <button className="flex items-center mr-4 hover:text-primary transition">
                    <HiHeart className="mr-1" /> {post.likes}
                  </button>
                  <button className="flex items-center hover:text-primary transition">
                    <HiChatAlt className="mr-1" /> {post.comments}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interaction History */}
        <section>
          <div className="flex items-center mb-4">
            <FaCommentAlt className="mr-2 text-teal text-xl" />
            <h2 className="text-xl font-semibold">Your Interactions</h2>
          </div>
          <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
            <ul className="space-y-4">
              {interactions.map(interaction => (
                <li key={interaction.id} className="border-b border-light-bg dark:border-dark-bg last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-teal/20 dark:bg-teal/30 flex items-center justify-center mr-3 mt-1">
                      {interaction.type === 'comment' ? <HiChatAlt className="text-teal" /> :
                       interaction.type === 'support' ? <HiCash className="text-gold" /> :
                       <HiHeart className="text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium capitalize">{interaction.type}</span> on {interaction.artistName}'s
                        {interaction.post && <span> "{interaction.post}"</span>}
                      </p>
                      {interaction.content && (
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          "{interaction.content}"
                        </p>
                      )}
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        {interaction.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 py-2 text-sm text-teal border border-teal/20 hover:bg-teal/10 rounded-md transition">
              View All Interactions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistHubPage;