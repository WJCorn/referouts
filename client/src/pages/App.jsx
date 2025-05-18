import { Routes, Route, Link } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import SubmitPage from "./pages/SubmitPage";
import AdminPage from "./pages/AdminPage";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <div className="p-6">
      <nav className="mb-6 space-x-4">
        <Link to="/" className="text-blue-600 font-bold">Referouts</Link>
        <Link to="/match">Match</Link>
        <Link to="/submit">Submit</Link>
        <SignedIn>
          <Link to="/providers">Admin</Link>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </nav>

      <Routes>
        <Route path="/" element={<p>Welcome to Referouts</p>} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route
          path="/providers"
          element={
            <SignedIn>
              <AdminPage />
            </SignedIn>
          }
        />
      </Routes>
    </div>
  );
}