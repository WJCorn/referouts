import ComingSoon from './pages/ComingSoon';
import ProviderProfile from './pages/ProviderProfile';
import FacilityProfile from './pages/FacilityProfile';
import NewFacility from './pages/NewFacility';
import NewProvider from './pages/NewProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const COMING_SOON = import.meta.env.VITE_COMING_SOON === 'true';

function App() {
  if (COMING_SOON) {
    return <ComingSoon />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/facility/:id" element={<FacilityProfile />} />

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
      </Routes>
    </Router>
  );
}

export default App;