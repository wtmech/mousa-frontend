import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight, HiSearch } from 'react-icons/hi';
import { FiUser, FiChevronDown, FiChevronUp, FiSettings, FiLogOut, FiCreditCard } from 'react-icons/fi';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const TopBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    // Implementation would handle actual logout logic
    setUserMenuOpen(false);
  };

  return (
    <div className="h-16 bg-light-surface dark:bg-dark-surface px-6 flex items-center justify-between border-b border-teal/20 dark:border-teal/20">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20"
        >
          <HiArrowLeft className="w-4 h-4 text-light-text dark:text-dark-text" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20"
        >
          <HiArrowRight className="w-4 h-4 text-light-text dark:text-dark-text" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light-text-secondary dark:text-dark-text-secondary">
            <HiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            className="w-full rounded-full py-2 pl-10 pr-4 bg-light-bg dark:bg-dark-bg border-none focus:ring-1 focus:ring-teal"
          />
        </div>
      </div>

      {/* Theme Toggle & User Menu */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <HiMoon className="w-4 h-4 text-light-text dark:text-dark-text" />
          ) : (
            <HiSun className="w-4 h-4 text-light-text dark:text-dark-text" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
              <FiUser className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium">User</span>
            {userMenuOpen ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-light-surface dark:bg-dark-surface rounded-md shadow-lg py-1 z-50 border border-light-bg dark:border-dark-bg">
              <div className="px-4 py-3 border-b border-light-bg dark:border-dark-bg">
                <p className="text-sm leading-5 font-medium">Billy Smith</p>
                <p className="text-xs leading-4 text-light-text-secondary dark:text-dark-text-secondary truncate">billy.smith@example.com</p>
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
              >
                <FiUser className="inline mr-2" /> Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
              >
                <FiSettings className="inline mr-2" /> Settings
              </a>
              <a
                href="/account"
                className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
              >
                <FiCreditCard className="inline mr-2" /> Account Management
              </a>
              <div className="border-t border-light-bg dark:border-dark-bg my-1"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
              >
                <FiLogOut className="inline mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;