import { Link, useLocation } from 'react-router-dom';
import { HiCollection, HiViewList } from 'react-icons/hi';
import { HiSparkles, HiRss, HiChevronLeft, HiChevronRight, HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { RiHeartFill } from 'react-icons/ri';
import { MdAudiotrack, MdPlaylistAdd, MdAlbum, MdPlaylistPlay, MdMusicNote, MdDownload, MdHistory } from 'react-icons/md';
import { FaGuitar, FaUsers, FaCompactDisc, FaLock } from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState({
    collection: false
  });
  const location = useLocation();

  const navItems = [
    { id: 1, name: 'Discover', path: '/discover', icon: <HiSparkles className="w-5 h-5" /> },
    {
      id: 2,
      name: 'Collection',
      path: '/collection',
      icon: <FaCompactDisc className="w-5 h-5" />,
      subItems: [
        { id: 'playlists', name: 'Playlists', path: '/collection/playlists', icon: <MdPlaylistPlay className="w-4 h-4" /> },
        { id: 'saved', name: 'Liked Music', path: '/collection/liked', icon: <RiHeartFill className="w-4 h-4" /> },
        { id: 'purchased', name: 'Purchased', path: '/collection/purchased', icon: <FaLock className="w-4 h-4" /> },
        { id: 'downloads', name: 'Downloads', path: '/collection/downloads', icon: <MdDownload className="w-4 h-4" /> },
        { id: 'exclusive', name: 'Exclusive Content', path: '/collection/exclusive', icon: <RiVipCrownFill className="w-4 h-4" /> },
        { id: 'history', name: 'History', path: '/collection/history', icon: <MdHistory className="w-4 h-4" /> },
      ]
    },
    { id: 3, name: 'Feed', path: '/feed', icon: <HiRss className="w-5 h-5" /> },
  ];

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle sub-items
  const toggleSubItems = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Check if any sub-item matches the current path
  useEffect(() => {
    const collectionPaths = navItems
      .find(item => item.id === 2)?.subItems
      .map(subItem => subItem.path);

    if (collectionPaths?.some(path => location.pathname.includes(path))) {
      setExpandedItems(prev => ({ ...prev, collection: true }));
    }
  }, [location.pathname]);

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-20'} h-full bg-light-surface dark:bg-dark-surface flex flex-col border-r border-light-bg dark:border-dark-bg transition-all duration-300 overflow-y-auto pb-24`}>
      {/* Logo and Toggle */}
      <div className="p-6 flex items-center justify-between">
        <Logo collapsed={!isExpanded} />
        <button
          onClick={toggleSidebar}
          className="text-primary hover:bg-primary/10 rounded-full p-1 transition-colors"
        >
          {isExpanded ? (
            <HiChevronLeft className="w-5 h-5" />
          ) : (
            <HiChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className={`space-y-1 ${isExpanded ? 'px-4' : 'px-2'}`}>
          {navItems.map((item) => (
            <li key={item.id} className={item.subItems ? 'mb-1' : ''}>
              {/* Main nav item */}
              {item.subItems ? (
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    className={`flex-grow flex items-center p-3 text-light-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary/10 dark:bg-primary/20' : ''} ${!isExpanded && 'justify-center'}`}
                  >
                    <span className={`text-primary ${isExpanded && 'mr-3'}`}>{item.icon}</span>
                    {isExpanded && <span className="font-medium">{item.name}</span>}
                  </Link>
                  {isExpanded && (
                    <button
                      onClick={() => toggleSubItems(item.name.toLowerCase())}
                      className="p-3 text-light-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors"
                    >
                      {expandedItems[item.name.toLowerCase()] ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-3 text-light-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary/10 dark:bg-primary/20' : ''} ${!isExpanded && 'justify-center'}`}
                  title={!isExpanded ? item.name : ''}
                >
                  <span className={`text-primary ${isExpanded && 'mr-3'}`}>{item.icon}</span>
                  {isExpanded && <span className="font-medium">{item.name}</span>}
                </Link>
              )}

              {/* Sub-items */}
              {isExpanded && item.subItems && expandedItems[item.name.toLowerCase()] && (
                <ul className="pl-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center py-2 px-3 text-sm text-light-text dark:text-dark-text hover:bg-primary/5 dark:hover:bg-primary/10 rounded-md transition-colors ${location.pathname === subItem.path ? 'bg-primary/5 dark:bg-primary/10 text-primary' : ''}`}
                      >
                        <span className="text-light-text-secondary dark:text-dark-text-secondary mr-2">{subItem.icon}</span>
                        <span>{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Recently Played & Supported Artists - Only show when expanded */}
      {isExpanded && (
        <div className="p-4 border-t border-light-bg dark:border-[#2D3748] mt-4">
          <h3 className="font-poppins text-sm font-semibold mb-2 text-light-text-secondary dark:text-dark-text-secondary">RECENTLY PLAYED</h3>
          <ul className="space-y-1 mb-4">
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <MdAudiotrack className="mr-2 text-teal text-xs" /> Daily Mix 1
            </li>
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <MdAlbum className="mr-2 text-gold text-xs" /> New Releases
            </li>
          </ul>

          <h3 className="font-poppins text-sm font-semibold mb-2 text-light-text-secondary dark:text-dark-text-secondary">SUPPORTED ARTISTS</h3>
          <ul className="space-y-1">
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <FaGuitar className="mr-2 text-primary text-xs" /> Luna Ray
            </li>
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <FaGuitar className="mr-2 text-sage text-xs" /> The Echomakers
            </li>
          </ul>
        </div>
      )}

      {/* When collapsed, show only icons for quick access */}
      {!isExpanded && (
        <div className="px-2 pb-4 flex flex-col items-center">
          <div className="w-10 h-1 bg-light-bg dark:bg-dark-bg my-4 rounded-full"></div>
          <ul className="space-y-3">
            <li className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full cursor-pointer flex items-center justify-center" title="Recently Played">
              <MdAudiotrack className="text-teal text-lg" />
            </li>
            <li className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full cursor-pointer flex items-center justify-center" title="Supported Artists">
              <FaGuitar className="text-primary text-lg" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;