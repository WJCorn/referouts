import ComingSoon from './ComingSoon';
import ProviderProfile from './ProviderProfile';
import FacilityProfile from './FacilityProfile';
import NewFacility from './NewFacility';
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