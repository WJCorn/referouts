import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

import ComingSoon from './pages/ComingSoon';
import ProviderProfile from './pages/ProviderProfile';
import FacilityProfile from './pages/FacilityProfile';
import NewFacility from './pages/NewFacility';
import NewProvider from './pages/NewProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Directory from './pages/Directory';
import EditProvider from './pages/EditProvider';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EarlyAccess from './pages/EarlyAccess';

const COMING_SOON = import.meta.env.VITE_COMING_SOON === 'true';

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/sign-in');

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/sign-in"
          element={
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
              <SignIn />
            </div>
          }
        />

        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/facility/:id" element={<FacilityProfile />} />

        <Route
          path="/directory"
          element={
            <ProtectedRoute>
              <Directory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facility/new"
          element={
            <ProtectedRoute>
              <NewFacility />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/new"
          element={
            <ProtectedRoute>
              <NewProvider />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/provider/:id/edit"
          element={
            <ProtectedRoute>
              <EditProvider />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  if (COMING_SOON) return <ComingSoon />;

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
