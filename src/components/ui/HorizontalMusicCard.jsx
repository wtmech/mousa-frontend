import React from 'react';

/**
 * HorizontalMusicCard component for displaying music items in a horizontal layout
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the music item
 * @param {string} props.subtitle - Subtitle/artist name
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.bgColor - Background color for the icon container (e.g., 'primary', 'teal', 'gold')
 * @param {string} props.rightText - Optional text to display on the right side
 * @param {string} props.badgeText - Optional badge text to display
 * @param {string} props.size - Size variant of the card ('small', 'medium', 'large')
 * @param {Function} props.onClick - Click handler function
 */
const HorizontalMusicCard = ({
  title,
  subtitle,
  icon,
  bgColor = 'primary',
  rightText,
  badgeText,
  size = 'medium',
  onClick,
}) => {
  // Map size to appropriate styles
  const sizeStyles = {
    small: 'p-1.5',
    medium: 'p-2',
    large: 'p-3',
  };

  // Map icon container size
  const iconContainerSize = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  // Map icon size
  const iconSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  // Map text sizes
  const titleSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const subtitleSize = {
    small: 'text-[10px]',
    medium: 'text-xs',
    large: 'text-sm',
  };

  // Map background colors
  const bgColors = {
    primary: 'bg-primary/20 dark:bg-primary/30',
    teal: 'bg-teal/20 dark:bg-teal/30',
    gold: 'bg-gold/20 dark:bg-gold/30',
    sage: 'bg-sage/20 dark:bg-sage/30',
  };

  // Map text accent colors
  const textColors = {
    primary: 'text-primary',
    teal: 'text-teal',
    gold: 'text-gold',
    sage: 'text-sage',
  };

  return (
    <div
      className={`bg-light-surface dark:bg-dark-surface ${sizeStyles[size]} rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center`}
      onClick={onClick}
    >
      <div className={`${iconContainerSize[size]} ${bgColors[bgColor]} rounded-md flex items-center justify-center mr-2`}>
        {React.cloneElement(icon, { className: `${iconSize[size]} ${textColors[bgColor]}` })}
      </div>

      <div className="flex-grow">
        <h3 className={`font-sans font-medium ${titleSize[size]}`}>{title}</h3>
        <p className={`font-sans ${subtitleSize[size]} text-light-text-secondary dark:text-dark-text-secondary`}>{subtitle}</p>

        {badgeText && (
          <span className={`font-sans text-[10px] ${bgColors[bgColor]} ${textColors[bgColor]} px-1 py-0.5 rounded-full mt-1 inline-block`}>
            {badgeText}
          </span>
        )}
      </div>

      {rightText && (
        <span className={`font-sans ${subtitleSize[size]} ${textColors[bgColor]}`}>{rightText}</span>
      )}
    </div>
  );
};

export default HorizontalMusicCard;