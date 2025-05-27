import { useEffect, useState } from 'react';

export default function MatchWeights() {
  const [weights, setWeights] = useState({
    insurance: 30,
    levelOfCare: 30,
    distance: 40
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/admin/match-weights`);
        const data = await res.json();
        if (data) setWeights(data);
      } catch (err) {
        console.error('Failed to load match weights:', err);
      }
    };

    fetchWeights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeights(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/admin/match-weights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weights)
      });
      if (res.ok) {
        setStatus('Saved!');
      } else {
        setStatus('Failed to save');
      }
    } catch (err) {
      setStatus('Error saving weights');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match Weight Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {['insurance', 'levelOfCare', 'distance'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field} weight</label>
            <input
              type="range"
              name={field}
              min="0"
              max="100"
              step="5"
              value={weights[field]}
              onChange={handleChange}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-1">{weights[field]} pts</p>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
        {status && <p className="text-sm mt-2 text-gray-500">{status}</p>}
      </form>
    </div>
  );
}