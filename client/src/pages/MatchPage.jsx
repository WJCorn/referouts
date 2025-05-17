import { useState } from "react";

export default function MatchPage() {
  const [form, setForm] = useState({
    state: "",
    insurance: "",
    levelOfCare: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);

    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/referrals?${params}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log("✅ MatchPage is rendering");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Find Referral Matches</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full border p-2"
        />
        <input
          type="text"
          name="insurance"
          value={form.insurance}
          onChange={handleChange}
          placeholder="Insurance"
          className="w-full border p-2"
        />
        <input
          type="text"
          name="levelOfCare"
          value={form.levelOfCare}
          onChange={handleChange}
          placeholder="Level of Care"
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Searching...</p>}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Matches Found:</h2>
          {results.map((provider, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{provider.name}</h3>
              <p>State: {provider.state}</p>
              <p>Insurances: {provider.insurances?.join(", ")}</p>
              <p>Levels of Care: {provider.levelsOfCare?.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
