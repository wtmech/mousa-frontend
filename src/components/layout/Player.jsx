import { HiPlay, HiVolumeUp } from 'react-icons/hi';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

const Player = () => {
  return (
    <div className="h-20 bg-light-surface dark:bg-dark-surface border-t border-teal/20 dark:border-teal/20 flex items-center p-4">
      <div className="container mx-auto grid grid-cols-3 items-center">
        {/* Song Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-light-bg dark:bg-dark-bg rounded shadow-md flex-shrink-0">
            {/* Album Artwork */}
          </div>
          <div>
            <h4 className="text-sm font-medium">Not Playing</h4>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Select a track</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-4">
            <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors">
              <BiSkipPrevious className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-hover">
              <HiPlay className="w-5 h-5" />
            </button>
            <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors">
              <BiSkipNext className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full mt-2 flex items-center space-x-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">0:00</span>
            <div className="flex-1 h-1 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
              <div className="h-full bg-teal w-0"></div>
            </div>
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">0:00</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex justify-end items-center space-x-4">
          <button className="text-light-text-secondary dark:text-dark-text-secondary hover:text-teal dark:hover:text-teal">
            <HiVolumeUp className="w-5 h-5" />
          </button>
          <div className="w-24 h-1 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
            <div className="h-full bg-teal w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;