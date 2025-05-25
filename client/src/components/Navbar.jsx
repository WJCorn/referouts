import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center shrink-0" aria-label="Homepage">
          <picture>
            <source srcSet="/logo.svg" type="image/svg+xml" />
            <img
              src="/logo.png"
              alt="ReferOuts logo"
              className="h-10 w-auto object-contain transition duration-300 dark:invert"
            />
          </picture>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Login</Link>
        </nav>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 py-4' : 'max-h-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      </div>
    </header>
  );
}