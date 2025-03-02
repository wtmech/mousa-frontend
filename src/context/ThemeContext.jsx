import { createContext, useState, useEffect, useContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a preference saved in local storage, otherwise default to dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('mousa-theme');
    return savedTheme || 'dark';
  });

  // Update the HTML data-theme attribute when theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the previous theme class
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Save the preference to localStorage
    localStorage.setItem('mousa-theme', theme);
  }, [theme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Provide the theme state and toggle function
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;