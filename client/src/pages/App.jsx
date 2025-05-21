import ComingSoon from './pages/ComingSoon';
import ProviderProfile from './pages/ProviderProfile';
import FacilityProfile from './pages/FacilityProfile';
import NewFacility from './pages/NewFacility';
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
        <Route path="/facility/new" element={<NewFacility />} />
      </Routes>
    </Router>
  );
}

export default App;