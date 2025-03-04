import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight, HiSearch } from 'react-icons/hi';
import { FiUser, FiChevronDown, FiChevronUp, FiSettings, FiLogOut, FiCreditCard } from 'react-icons/fi';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
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
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 rounded-full bg-secondary/50 px-3 py-1.5 hover:bg-secondary/80"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              {user?.username?.charAt(0) || 'U'}
            </div>
            <span className="font-medium">{user?.username || 'User'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-background shadow-lg border border-border z-10">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium">{user?.username || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="py-1">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-secondary/50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;