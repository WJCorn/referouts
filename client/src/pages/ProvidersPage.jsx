import { useEffect, useState } from "react";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

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

  const filtered = providers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.state.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey]?.toString().toLowerCase();
    const valB = b[sortKey]?.toString().toLowerCase();
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Submitted Providers</h1>

      <input
        type="text"
        placeholder="Search by name or state..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th onClick={() => handleSort("name")} className="cursor-pointer px-3 py-2">Facility</th>
                <th onClick={() => handleSort("state")} className="cursor-pointer px-3 py-2">State</th>
                <th className="px-3 py-2">Insurances</th>
                <th className="px-3 py-2">Levels of Care</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2">{p.state}</td>
                  <td className="px-3 py-2 text-sm">{p.insurances?.join(", ")}</td>
                  <td className="px-3 py-2 text-sm">{p.levelsOfCare?.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}