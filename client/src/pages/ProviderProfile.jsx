import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers/${id}`);
        const data = await res.json();
        setProvider(data);
      } catch (err) {
        console.error('Error fetching provider:', err);
      }
    };
    fetchProvider();
  }, [id]);

  if (!provider) return <div className="p-10 text-gray-500 text-center text-xl">Loading...</div>;

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b pb-10">
          {provider.logoUrl && (
            <img
              src={provider.logoUrl}
              alt="Logo"
              className="w-28 h-28 object-cover rounded-2xl shadow-md"
            />
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-semibold tracking-tight">{provider.name}</h1>
            {provider.description && (
              <p className="mt-2 text-gray-600 text-lg">{provider.description}</p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="grid sm:grid-cols-2 gap-10 mt-12 text-base leading-relaxed">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">📞 Contact</h2>
            <p><strong>Email:</strong> {provider.contactEmail}</p>
            {provider.phone && <p><strong>Phone:</strong> {provider.phone}</p>}
            {provider.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={provider.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {provider.website}
                </a>
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">📍 Address</h2>
            <p>{provider.address?.street}</p>
            <p>{provider.address?.city}, {provider.address?.state} {provider.address?.zip}</p>
          </div>

          {provider.levelsOfCare?.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">🧠 Levels of Care</h2>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                {provider.levelsOfCare.map((lvl, i) => <li key={i}>{lvl}</li>)}
              </ul>
            </div>
          )}

          {provider.insuranceAccepted?.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">💳 Insurance Accepted</h2>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                {provider.insuranceAccepted.map((ins, i) => <li key={i}>{ins}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Sub-Facilities */}
        {provider.isNetwork && provider.subFacilities?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">🏢 Network Facilities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {provider.subFacilities.map(fac => (
                <div
                  key={fac._id}
                  className="p-5 border rounded-2xl hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{fac.name}</h3>
                  <p className="text-sm text-gray-600">
                    {fac.address?.city}, {fac.address?.state}
                  </p>
                  <a
                    href={`/facility/${fac._id}`}
                    className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                  >
                    View Facility →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}