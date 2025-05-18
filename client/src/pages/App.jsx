import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ComingSoon from "./pages/ComingSoon"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main public route */}
        <Route path="/" element={<ComingSoon />} />

        {/* Catch-all fallback: redirect everything else to ComingSoon */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </Router>
  )
}
