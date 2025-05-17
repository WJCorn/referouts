import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MatchPage from "./MatchPage";
import SubmitPage from "./SubmitPage";

export default function App() {
  return (
    <Router>
      <div className="p-8 text-center text-xl text-gray-700">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to Referouts</h1>

        {/* Navigation */}
        <nav className="space-x-4 mb-6">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/match" className="text-blue-500 hover:underline">Match</Link>
          <Link to="/submit" className="text-blue-500 hover:underline">Submit</Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Inline Home Component
function Home() {
  return (
    <div>
      <p>This is the homepage. Use the navigation above to search referrals.</p>
    </div>
  );
}