import { useState } from 'react';

export default function MatchPage() {
  const [form, setForm] = useState({
    insurance: '',
    state: '',
    levelOfCare: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const query = new URLSearchParams(form).toString();
      const res = await fetch(`https://referouts-production.up.railway.app/api/referrals?${query}`);
      const data = await res.json();
      setResults(data); // expected to be an array
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Find a Referral Match</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input
          type="text"
          name="insurance"
          placeholder="Insurance"
          value={form.insurance}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="levelOfCare"
          placeholder="Level of Care"
          value={form.levelOfCare}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Match
        </button>
      </form>

      {loading && <p className="mt-4 text-sm text-gray-500">Searching...</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Matches:</h3>
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li key={i} className="p-4 border rounded shadow-sm">
                <p><strong>{r.name}</strong></p>
                <p>{r.city}, {r.state}</p>
                <p>Accepted Insurance: {r.insurance}</p>
                <p>Level of Care: {r.levelOfCare}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}