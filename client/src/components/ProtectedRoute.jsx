import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // wait for Clerk to load

  return isSignedIn ? children : <Navigate to="/sign-in" replace />;
}