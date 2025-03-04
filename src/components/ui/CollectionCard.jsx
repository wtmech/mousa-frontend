import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CollectionCard component for displaying collection section items in a grid layout
 * This is a specialized version of MusicCard for collection sections
 *
 * @param {Object} props
 * @param {string} props.title - Title of the collection section
 * @param {string} props.count - Number of items in this section
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.color - Text color for the icon (e.g., 'primary', 'teal', 'gold')
 * @param {string} props.bgColor - Background color for the icon container (e.g., 'primary', 'teal', 'gold')
 * @param {string} props.path - Path to navigate to when clicked
 * @param {string} props.size - Size variant of the card ('small', 'medium', 'large')
 */
const CollectionCard = ({
  title,
  count,
  icon,
  color = 'primary',
  bgColor = 'primary',
  path,
  size = 'medium'
}) => {
  // Map size to appropriate styles
  const sizeStyles = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-5',
  };

  // Map icon container size
  const iconContainerSize = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  // Map text sizes
  const titleSize = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Map background colors
  const bgColors = {
    primary: 'bg-primary/20',
    teal: 'bg-teal/20',
    gold: 'bg-gold/20',
    sage: 'bg-sage/20',
    red: 'bg-red-500/20',
  };

  // Map text colors
  const textColors = {
    primary: 'text-primary',
    teal: 'text-teal',
    gold: 'text-gold',
    sage: 'text-sage',
    red: 'text-red-500',
  };

  return (
    <Link to={path}>
      <div className={`bg-light-surface dark:bg-dark-surface ${sizeStyles[size]} rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition cursor-pointer h-full`}>
        <div className={`${bgColors[bgColor]} ${textColors[color]} ${iconContainerSize[size]} rounded-full flex items-center justify-center mb-3`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <h3 className={`font-sans font-semibold ${titleSize[size]}`}>{title}</h3>
        <p className="font-sans text-sm text-light-text-secondary dark:text-dark-text-secondary">{count} items</p>
      </div>
    </Link>
  );
};

export default CollectionCard;