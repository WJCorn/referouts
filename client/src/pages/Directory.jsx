import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Directory() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [insuranceFilter, setInsuranceFilter] = useState('');
  const [levelOfCareFilter, setLevelOfCareFilter] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers`);
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error('Failed to fetch providers:', err);
      }
    };
    fetchProviders();
  }, []);

  const allStates = [...new Set(providers.map((p) => p.address?.state).filter(Boolean))].sort();
  const allInsurances = [...new Set(providers.flatMap((p) => p.insuranceAccepted || []))].sort();
  const allLevelsOfCare = [...new Set(providers.flatMap((p) => p.levelsOfCare || []))].sort();

  const filtered = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter ? p.address?.state === stateFilter : true;
    const matchesInsurance = insuranceFilter
      ? (p.insuranceAccepted || []).includes(insuranceFilter)
      : true;
    const matchesLevelOfCare = levelOfCareFilter
      ? (p.levelsOfCare || []).includes(levelOfCareFilter)
      : true;

    return matchesSearch && matchesState && matchesInsurance && matchesLevelOfCare;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">🔎 Provider Directory</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">All States</option>
          {allStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          value={insuranceFilter}
          onChange={(e) => setInsuranceFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">All Insurance</option>
          {allInsurances.map((ins) => (
            <option key={ins} value={ins}>{ins}</option>
          ))}
        </select>

        <select
          value={levelOfCareFilter}
          onChange={(e) => setLevelOfCareFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">All Levels of Care</option>
          {allLevelsOfCare.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <div
              key={provider._id}
              className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {provider.address?.city}, {provider.address?.state}
              </p>
              <p className="text-xs text-gray-400 mb-3">{provider.isNetwork ? 'Network' : 'Facility'}</p>

              {/* Tags */}
              {provider.services?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.services.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to={`/provider/${provider._id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No matching providers found.</p>
      )}
    </div>
  );
}