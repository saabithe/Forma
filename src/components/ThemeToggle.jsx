import { useTheme } from '../theme/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-200"
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun
          className="h-5 w-5"
          style={{ color: colors.accent }}
        />
      ) : (
        <Moon
          className="h-5 w-5"
          style={{ color: colors.accent }}
        />
      )}
    </button>
  );
}