import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MatchPage from './pages/MatchPage';
import SubmitPage from './pages/SubmitPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/match" style={{ marginRight: '1rem' }}>Referral Match</Link>
        <Link to="/submit">Provider Submit</Link>
      </nav>
      <Routes>
        <Route path="/match" element={<MatchPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/" element={<div style={{ padding: '2rem' }}><h1>Welcome to Referouts</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;