import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setRole(data.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };

    if (isSignedIn) fetchUser();
  }, [isSignedIn]);

  return (
    <header className="w-full py-4 px-6 border-b bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto object-contain dark:invert" />
        </Link>

        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          {isSignedIn && role && (
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-200">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          )}

          {isSignedIn ? (
            <>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Signed in as
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-white">
                  {window.Clerk.user?.primaryEmailAddress?.emailAddress || 'Your email'}
                </span>
              </div>

              {role === 'admin' && (
                <Link to="/admin" className="hover:text-teal-800 dark:hover:text-white transition">Dashboard</Link>
              )}
              <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Logout</Link>
            </>
          ) : (
            <Link to="/sign-in" className="hover:text-teal-800 dark:hover:text-white transition">Login</Link>
          )}

        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden mt-4 px-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          {isSignedIn && role && (
            <div className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-200 inline-block">
              {role}
            </div>
          )}
          {isSignedIn ? (
            <>
              {role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Dashboard</Link>
              )}
              <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Logout</Link>
            </>
          ) : (
            <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Login</Link>
          )}
        </nav>
      )}
    </header>
  );
}