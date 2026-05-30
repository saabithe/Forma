import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME = {
  light: {
    bg: '#F2F2F2',
    surface: '#FFFFFF',
    surfaceHover: '#F8F8F8',
    text: '#1a1a1a',
    textSecondary: '#6b7280',
    accent: '#174D38',
    accentHover: '#1e6648',
    border: 'rgba(0, 0, 0, 0.08)',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
  },
  dark: {
    bg: '#0f0f0f',
    surface: '#1a1a1a',
    surfaceHover: '#222222',
    text: '#f0f0f0',
    textSecondary: '#888888',
    accent: '#2d8b6e',
    accentHover: '#3aa882',
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      colors: THEME[isDarkMode ? 'dark' : 'light']
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
