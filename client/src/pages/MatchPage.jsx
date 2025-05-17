import { useState } from "react";

export default function MatchPage() {
  const [form, setForm] = useState({ insurance: "", state: "", levelOfCare: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setError(null);

    const params = new URLSearchParams(form).toString();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/referrals?${params}`);
      if (!res.ok) throw new Error("Failed to fetch referrals");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not retrieve referrals. Please try again.");
      console.error("❌ Fetch error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find a Referral Match</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="insurance"
          placeholder="Insurance"
          value={form.insurance}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="levelOfCare"
          placeholder="Level of Care"
          value={form.levelOfCare}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Match
        </button>
      </form>

      {loading && <p className="mt-4">🔄 Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <ul className="space-y-2">
            {results.map((provider, i) => (
              <li key={i} className="p-3 border rounded">
                <p className="font-bold">{provider.name}</p>
                <p>{provider.state}</p>
                <p className="text-sm text-gray-600">
                  {provider.levelsOfCare?.join(", ")} | {provider.insurances?.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
