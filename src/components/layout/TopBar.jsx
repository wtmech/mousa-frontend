import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight, HiSearch } from 'react-icons/hi';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
        <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
          <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center">
            <FiUser className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">User</span>
          <FiChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;