import { useState } from 'react';

export default function ReferralForm() {
  const [formData, setFormData] = useState({
    insurance: '',
    levelOfCare: '',
    zip: '',
    inNetworkOnly: false,
    maxDistance: 100
  });

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMatches([]);

    try {
      const zip = formData.zip;
      const geoRes = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!geoRes.ok) throw new Error('ZIP not found');
      const geoData = await geoRes.json();
      const coords = {
        lat: parseFloat(geoData.places[0].latitude),
        lon: parseFloat(geoData.places[0].longitude)
      };

      const body = {
        insurance: formData.insurance,
        levelOfCare: formData.levelOfCare,
        zip,
        latitude: coords.lat,
        longitude: coords.lon,
        inNetworkOnly: formData.inNetworkOnly,
        maxDistance: parseInt(formData.maxDistance)
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/referrals/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!data.matches || data.matches.length === 0) {
        setError('No matching facilities were found.');
      } else {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while matching. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find a Referral Match</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="insurance"
          placeholder="Insurance (e.g., Cigna)"
          value={formData.insurance}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="levelOfCare"
          placeholder="Level of Care (e.g., Residential)"
          value={formData.levelOfCare}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="inNetworkOnly"
            checked={formData.inNetworkOnly}
            onChange={handleChange}
            className="accent-blue-600"
          />
          <span>Only show in-network facilities</span>
        </label>

        <label className="block">
          <span className="block mb-1 text-sm font-medium">Max Distance: {formData.maxDistance} miles</span>
          <input
            type="range"
            name="maxDistance"
            min="0"
            max="200"
            value={formData.maxDistance}
            onChange={handleChange}
            className="w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Matching...' : 'Match Me'}
        </button>
      </form>

      {error && (
        <div className="mt-6 text-red-600 bg-red-100 p-4 rounded">
          <p className="font-semibold">{error}</p>
          <p className="text-sm mt-1 text-gray-700">
            Try changing the insurance, level of care, or ZIP code. If you're still having trouble,{' '}
            <a href="/contact" className="text-blue-600 underline">contact us</a> for assistance.
          </p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Matches</h2>
          <ul className="space-y-4">
            {matches.map((match, idx) => (
              <li key={idx} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg">{match.facility.name}</h3>
                <p>{match.facility.address?.city}, {match.facility.address?.state}</p>
                <p className="text-sm text-gray-500">Score: {match.score}</p>
                <ul className="text-sm list-disc ml-5 mt-2 text-gray-600">
                  {match.reasons.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}