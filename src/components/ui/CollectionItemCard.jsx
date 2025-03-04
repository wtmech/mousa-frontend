import React from 'react';

/**
 * CollectionItemCard component for displaying collection items in a horizontal layout
 * This is based on the HorizontalMusicCard component but specifically for collection items
 *
 * @param {Object} props
 * @param {string} props.title - Title of the item
 * @param {string} props.artist - Artist name
 * @param {string} props.type - Type of item (album, track, playlist)
 * @param {string} props.addedDate - Date when the item was added
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.color - Color theme (e.g., 'primary', 'teal')
 * @param {Function} props.onClick - Function to call when card is clicked
 */
const CollectionItemCard = ({
  title,
  artist,
  type,
  addedDate,
  icon,
  color = 'teal',
  onClick,
}) => {
  // Map colors
  const textColors = {
    primary: 'text-primary',
    teal: 'text-teal',
    gold: 'text-gold',
    sage: 'text-sage',
  };

  // Map background colors
  const bgColors = {
    primary: 'bg-primary/20 dark:bg-primary/30',
    teal: 'bg-teal/20 dark:bg-teal/30',
    gold: 'bg-gold/20 dark:bg-gold/30',
    sage: 'bg-sage/20 dark:bg-sage/30',
  };

  // Format the type for display (capitalize first letter)
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer flex items-center"
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-md ${bgColors[color]} flex items-center justify-center mr-3`}>
        {React.cloneElement(icon, { className: textColors[color] })}
      </div>

      <div>
        <h3 className="font-sans font-medium text-sm">{title}</h3>
        <p className="font-sans text-xs text-light-text-secondary dark:text-dark-text-secondary">{artist}</p>
        <div className="flex mt-1 space-x-2 items-center">
          <span className={`font-sans text-xs ${bgColors[color]} ${textColors[color]} px-2 py-0.5 rounded-full`}>
            {formattedType}
          </span>
          <span className="font-sans text-xs text-light-text-secondary dark:text-dark-text-secondary">
            Added {addedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionItemCard;