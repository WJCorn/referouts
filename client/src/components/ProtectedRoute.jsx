import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthorized = localStorage.getItem('referouts_auth') === 'true';
  return isAuthorized ? children : <Navigate to="/" replace />;
}