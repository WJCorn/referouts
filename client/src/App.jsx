import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComingSoon from './pages/ComingSoon';
import ProviderProfile from './pages/ProviderProfile';
import FacilityProfile from './pages/FacilityProfile';
import NewFacility from './pages/NewFacility';
import NewProvider from './pages/NewProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Directory from './pages/Directory';
import EditProvider from './pages/EditProvider';

const COMING_SOON = import.meta.env.VITE_COMING_SOON === 'true';

function App() {
  if (COMING_SOON) {
    return <ComingSoon />;
  }

  return (
    <Router>
      <Routes>
        {/* Only render this after Coming Soon is disabled */}
        <Route path="/" element={<Directory />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/facility/:id" element={<FacilityProfile />} />
        <Route path="/directory" element={<Directory />} />

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
    </Router>
  );
}

export default App;