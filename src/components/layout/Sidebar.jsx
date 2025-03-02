import { Link } from 'react-router-dom';
import { HiCollection, HiViewList } from 'react-icons/hi';
import { HiSparkles, HiRss, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { RiHeartFill } from 'react-icons/ri';
import { MdAudiotrack, MdPlaylistAdd, MdAlbum } from 'react-icons/md';
import { FaGuitar, FaUsers, FaCompactDisc } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { id: 1, name: 'Discover', path: '/discover', icon: <HiSparkles className="w-5 h-5" /> },
    { id: 2, name: 'Collection', path: '/collection', icon: <FaCompactDisc className="w-5 h-5" /> },
    { id: 3, name: 'Artist Hub', path: '/artist-hub', icon: <FaGuitar className="w-5 h-5" /> },
    { id: 4, name: 'Library', path: '/library', icon: <HiCollection className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-20'} h-full bg-light-surface dark:bg-dark-surface flex flex-col border-r border-light-bg dark:border-dark-bg transition-all duration-300 overflow-y-auto pb-24`}>
      {/* Logo and Toggle */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="font-brand text-primary flex items-center">
          {isExpanded ? (
            <span className="text-2xl">Mousa</span>
          ) : (
            <span className="text-2xl">M</span>
          )}
        </h1>
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
        <ul className={`space-y-2 ${isExpanded ? 'px-4' : 'px-2'}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center p-3 text-light-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors ${!isExpanded && 'justify-center'}`}
                title={!isExpanded ? item.name : ''}
              >
                <span className={`text-primary ${isExpanded && 'mr-3'}`}>{item.icon}</span>
                {isExpanded && <span className="font-medium">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Recently Played & Supported Artists - Only show when expanded */}
      {isExpanded && (
        <div className="p-4 border-t border-light-bg dark:border-[#2D3748]">
          <h3 className="font-poppins text-sm font-semibold mb-2 text-light-text-secondary dark:text-dark-text-secondary">RECENTLY PLAYED</h3>
          <ul className="space-y-1 mb-4">
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <MdAudiotrack className="mr-2 text-teal" /> Daily Mix 1
            </li>
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <MdAlbum className="mr-2 text-gold" /> New Releases
            </li>
          </ul>

          <h3 className="font-poppins text-sm font-semibold mb-2 text-light-text-secondary dark:text-dark-text-secondary">SUPPORTED ARTISTS</h3>
          <ul className="space-y-1">
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <FaGuitar className="mr-2 text-primary" /> Luna Ray
            </li>
            <li className="text-sm p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md cursor-pointer flex items-center">
              <FaGuitar className="mr-2 text-sage" /> The Echomakers
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