import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Role-restricted paths
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setUserRole(data.role); // "admin" or "provider"
      } catch (err) {
        console.error('Error fetching user role:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      fetchUserRole();
    } else {
      setLoading(false); // unauthenticated
    }
  }, [isSignedIn]);

  if (!isLoaded || loading) return <div className="p-4">Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Block non-admins from admin pages
  if (isAdminRoute && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}