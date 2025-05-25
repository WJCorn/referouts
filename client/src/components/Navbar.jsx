import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import Logo from '../assets/LogoOnly';

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 border-b bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold tracking-tight dark:text-white">
          <Logo className="h-8 w-auto fill-current text-teal-800 dark:text-white" />
          <span className="text-teal-800 dark:text-white">ReferOuts</span>
        </Link>

        <div className="flex gap-4 items-center">
          <nav className="flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Login</Link>
          </nav>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}