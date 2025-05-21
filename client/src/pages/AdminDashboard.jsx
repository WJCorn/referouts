import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers`);
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
    };
    fetchProviders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">📊 Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-medium">{provider.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {provider.isNetwork ? 'Network Provider' : 'Single Facility'}
            </p>
            <Link
              to={`/provider/${provider._id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}