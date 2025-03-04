import React from 'react';

/**
 * MusicCard component for displaying music items in a grid layout
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the music item
 * @param {string} props.subtitle - Subtitle/artist name
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.image - Image URL to display instead of icon
 * @param {string} props.bgColor - Background color for the icon container (e.g., 'primary', 'teal', 'gold')
 * @param {string} props.releaseDate - Optional release date to display
 * @param {string} props.accentColor - Color for special text like release date
 * @param {string} props.additionalText - Any additional text to display
 * @param {string} props.size - Size variant of the card ('small', 'medium', 'large')
 * @param {boolean} props.centered - Whether to center the content (for genres)
 * @param {Function} props.onClick - Click handler function
 */
const MusicCard = ({
  title,
  subtitle,
  icon,
  image,
  bgColor = 'primary',
  releaseDate,
  accentColor,
  additionalText,
  size = 'medium',
  centered = false,
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
    small: centered ? 'mb-1' : 'w-full aspect-square mb-1',
    medium: 'w-full aspect-square mb-1',
    large: 'w-full aspect-square mb-2',
  };

  // Map icon size
  const iconSize = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  // Map text sizes
  const titleSize = {
    small: 'text-xs',
    medium: 'text-xs',
    large: 'text-sm',
  };

  const subtitleSize = {
    small: 'text-[10px]',
    medium: 'text-xs',
    large: 'text-xs',
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

  // For centered layouts (like genres)
  if (centered) {
    return (
      <div
        className={`bg-light-surface dark:bg-dark-surface ${sizeStyles[size]} rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex flex-col items-center justify-center aspect-square`}
        onClick={onClick}
      >
        <div className={`${iconContainerSize[size]}`}>
          {icon}
        </div>
        <span className={`font-sans font-medium ${titleSize[size]}`}>{title}</span>
      </div>
    );
  }

  // Standard card layout
  return (
    <div
      className={`bg-light-surface dark:bg-dark-surface ${sizeStyles[size]} rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer`}
      onClick={onClick}
    >
      <div className={`${iconContainerSize[size]} rounded-lg flex items-center justify-center overflow-hidden`}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full ${bgColors[bgColor]} flex items-center justify-center`}>
            {React.cloneElement(icon, { className: `${iconSize[size]} ${textColors[bgColor]} opacity-70` })}
          </div>
        )}
      </div>
      <h3 className={`font-sans font-semibold ${titleSize[size]} truncate`}>{title}</h3>
      {subtitle && (
        <p className={`font-sans ${subtitleSize[size]} text-light-text-secondary dark:text-dark-text-secondary truncate`}>{subtitle}</p>
      )}

      {releaseDate && (
        <p className={`font-sans text-xs mt-1 ${textColors[accentColor || bgColor]}`}>Released: {releaseDate}</p>
      )}

      {additionalText && (
        <p className={`font-sans text-xs mt-1 ${textColors[accentColor || bgColor]}`}>{additionalText}</p>
      )}
    </div>
  );
};

export default MusicCard;