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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this provider?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProviders((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert('Failed to delete provider.');
      }
    } catch (err) {
      console.error('Error deleting provider:', err);
      alert('Server error during delete.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">📊 Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-medium mb-1">{provider.name}</h2>
            <p className="text-sm text-gray-600 mb-3">
              {provider.isNetwork ? 'Network Provider' : 'Single Facility'}
            </p>

            <div className="flex flex-col gap-1 text-sm">
              <Link
                to={`/provider/${provider._id}`}
                className="text-blue-600 hover:underline"
              >
                View Profile →
              </Link>
              <Link
                to={`/admin/provider/${provider._id}/edit`}
                className="text-green-600 hover:underline"
              >
                Edit Provider →
              </Link>
              <button
                onClick={() => handleDelete(provider._id)}
                className="text-red-500 hover:underline text-left"
              >
                Delete Provider
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}