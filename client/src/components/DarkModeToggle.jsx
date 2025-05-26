import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active = stored === 'dark' || (!stored && prefersDark);
    setIsDark(active);
    document.documentElement.classList.toggle('dark', active);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDark);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="transition duration-300 text-gray-700 dark:text-gray-300 hover:text-teal-800 dark:hover:text-white"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={20} className="transition-transform rotate-0" /> : <Moon size={20} className="transition-transform rotate-180" />}
    </button>
  );
}