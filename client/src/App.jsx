import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import SubmitPage from "./pages/SubmitPage";


function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/ping`)
      .then((res) => res.text())
      .then((data) => {
        console.log("✅ Backend response:", data);
      })
      .catch((err) => {
        console.error("❌ Error connecting to backend:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold mb-2">Referouts Frontend</h1>
                <p>Check the console for backend ping.</p>
                <p className="mt-4 text-sm text-gray-500">Visit <code>/match</code> to try the referral matching form.</p>
              </div>
            }
          />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;