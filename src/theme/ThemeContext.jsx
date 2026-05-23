import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Brutalist design theme colors inspired by Aerko_
export const BRUTALIST_THEME = {
  dark: {
    bg: '#0A0A0A',      // Softer black than #1A1A1A for better contrast
    surface: '#141414',
    surfaceHover: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    accent: '#CCFF00',  // Acid green
    accentHover: '#B0E500',
    border: '#333333',
    success: '#00FF88',
    warning: '#FFAA00',
    error: '#FF3366',
  },
  light: {
    bg: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceHover: '#E8E8E8',
    text: '#1A1A1A',
    textSecondary: '#666666',
    accent: '#99CC00',
    accentHover: '#88BB00',
    border: '#CCCCCC',
    success: '#00CC66',
    warning: '#DD9900',
    error: '#CC3333',
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Default to dark mode (brutalist aesthetic)
    return true;
  });

  useEffect(() => {
    // Update localStorage and document class
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      colors: BRUTALIST_THEME[isDarkMode ? 'dark' : 'light']
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};