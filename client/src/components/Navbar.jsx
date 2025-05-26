import { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 border-b bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto object-contain dark:invert" />
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Login</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden mt-4 px-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Login</Link>
        </nav>
      )}
    </header>
  );
}