import React from 'react';

/**
 * SectionTitle component for maintaining consistent styling of section headers
 * This component preserves the brand font for section headers while allowing
 * other text elements to use the standard sans-serif font.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The title text
 * @param {React.ReactNode} props.icon - Optional icon to display before the title
 * @param {string} props.className - Additional classes to apply
 */
const SectionTitle = ({ children, icon, className = '' }) => {
  return (
    <div className="flex items-center mb-3">
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      <h2 className={`text-xl font-semibold font-brand ${className}`}>
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;