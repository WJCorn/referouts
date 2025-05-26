import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
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
          {isSignedIn && user && (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user.imageUrl}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border dark:border-gray-600"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Signed in as</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-white">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>

              {role && (
                <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-200">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              )}

              {role === 'admin' && (
                <Link to="/admin" className="hover:text-teal-800 dark:hover:text-white transition">Dashboard</Link>
              )}

              <Link to="/profile" className="hover:text-teal-800 dark:hover:text-white transition">Profile</Link>

              <button
                onClick={signOut}
                className="hover:text-red-600 dark:hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}

          {!isSignedIn && (
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
          {isSignedIn && user && (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.imageUrl}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full border"
                />
                <div>
                  <div className="text-xs">Signed in as</div>
                  <div className="text-xs font-semibold">{user.primaryEmailAddress?.emailAddress}</div>
                </div>
              </div>

              {role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Dashboard</Link>
              )}
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Profile</Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="block text-left w-full text-red-600 hover:text-red-800 dark:hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}

          {!isSignedIn && (
            <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="block hover:text-teal-800 dark:hover:text-white">Login</Link>
          )}
        </nav>
      )}
    </header>
  );
}