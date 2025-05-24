import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 border-b bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold tracking-tight dark:text-white">
          ReferOuts
        </Link>

        <div className="flex gap-4 items-center">
          <nav className="flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Login</Link>
            <a href="#cta" className="hover:text-teal-800 dark:hover:text-white transition">Request Access</a>
          </nav>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}