import React from 'react';
import './Logo.css'; // Import the dedicated CSS file

/**
 * Logo component for displaying the Mousa brand logo consistently
 * This component ensures the logo always uses the brand font
 *
 * @param {Object} props
 * @param {string} props.size - Size variant ('sm', 'md', 'lg')
 * @param {boolean} props.collapsed - Whether to show just the "M" or full "Mousa"
 * @param {string} props.className - Additional classes to apply
 */
const Logo = ({ size = 'md', collapsed = false, className = '' }) => {
  // Map size to appropriate text size
  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  // Explicit inline styles to ensure the brand font is used
  const brandFontStyle = {
    fontFamily: 'Calistoga, cursive',
  };

  return (
    <h1 className={`text-primary ${className}`}>
      <span
        className={`${textSize[size]} mousa-logo`}
        style={brandFontStyle}
      >
        {collapsed ? 'M' : 'Mousa'}
      </span>
    </h1>
  );
};

export default Logo;