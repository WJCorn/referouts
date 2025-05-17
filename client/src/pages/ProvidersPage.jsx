import { useEffect, useState } from "react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/providers`);
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error("❌ Error fetching providers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Submitted Providers</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {providers.length === 0 && !loading && (
        <p className="text-red-500">No providers found.</p>
      )}

      <div className="space-y-4">
        {providers.map((p, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p><strong>State:</strong> {p.state}</p>
            <p><strong>Insurances:</strong> {p.insurances?.join(", ")}</p>
            <p><strong>Levels of Care:</strong> {p.levelsOfCare?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
