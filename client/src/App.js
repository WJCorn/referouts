import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MatchPage from './pages/MatchPage';
import SubmitPage from './pages/SubmitPage';

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen font-sans">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/match" className="text-blue-600 hover:underline">Referral Match</Link>
          <Link to="/submit" className="text-blue-600 hover:underline">Provider Submit</Link>
        </nav>

        <Routes>
          <Route path="/match" element={<MatchPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/" element={<div className="text-xl">Welcome to Referouts</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;