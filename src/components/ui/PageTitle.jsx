import React from 'react';

/**
 * PageTitle component for maintaining consistent styling of main page headers
 * This component preserves the brand font for main page titles while allowing
 * other text elements to use the standard sans-serif font.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The title text
 * @param {string} props.className - Additional classes to apply
 */
const PageTitle = ({ children, className = '' }) => {
  return (
    <h1 className={`text-3xl font-bold font-brand mb-3 ${className}`}>
      {children}
    </h1>
  );
};

export default PageTitle;