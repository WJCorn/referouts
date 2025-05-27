import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [providers, setProviders] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [provRes, facRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE}/providers`),
          fetch(`${import.meta.env.VITE_API_BASE}/facilities`)
        ]);

        const provData = await provRes.json();
        const facData = await facRes.json();

        setProviders(provData);
        setFacilities(facData);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filtered = facilities.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.address?.city?.toLowerCase().includes(search.toLowerCase()) ||
    f.address?.state?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Providers</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map(provider => (
            <li key={provider._id} className="border p-4 rounded shadow bg-white dark:bg-gray-900">
              <h3 className="text-lg font-bold">{provider.name}</h3>
              <p className="text-sm text-gray-500">{provider.email}</p>
              <Link
                to={`/providers/${provider._id}`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Facilities</h2>
        <input
          type="text"
          placeholder="Search by name, city, or state..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-md mb-4"
        />
        {loading ? (
          <p>Loading facilities...</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map(fac => (
              <li key={fac._id} className="border p-4 rounded shadow bg-white dark:bg-gray-900">
                <h3 className="font-bold text-lg">{fac.name}</h3>
                <p>{fac.address?.city}, {fac.address?.state}</p>
                <p className="text-xs text-gray-500">{fac.insuranceAccepted?.join(', ')}</p>
                <Link
                  to={`/facilities/${fac._id}`}
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}