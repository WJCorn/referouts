import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function FacilityProfile() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/facilities/${id}`);
        const data = await res.json();
        setFacility(data);
      } catch (err) {
        console.error('Error fetching facility:', err);
      }
    };
    fetchFacility();
  }, [id]);

  if (!facility) return <div className="p-10 text-gray-500 text-center text-xl">Loading...</div>;

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b pb-10">
          {facility.logoUrl && (
            <img
              src={facility.logoUrl}
              alt="Logo"
              className="w-24 h-24 object-cover rounded-2xl shadow-md"
            />
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">{facility.name}</h1>
            {facility.parentNetwork && (
              <p className="text-sm text-gray-500 mt-1">
                Part of <a href={`/provider/${facility.parentNetwork}`} className="text-blue-600 hover:underline">a provider network</a>
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="grid sm:grid-cols-2 gap-10 mt-12 text-base leading-relaxed">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">📞 Contact</h2>
            <p><strong>Email:</strong> {facility.contactEmail}</p>
            {facility.phone && <p><strong>Phone:</strong> {facility.phone}</p>}
            {facility.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={facility.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {facility.website}
                </a>
              </p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">📍 Address</h2>
            <p>{facility.address?.street}</p>
            <p>{facility.address?.city}, {facility.address?.state} {facility.address?.zip}</p>
          </div>

          {facility.levelsOfCare?.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">🧠 Levels of Care</h2>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                {facility.levelsOfCare.map((lvl, i) => <li key={i}>{lvl}</li>)}
              </ul>
            </div>
          )}

          {facility.insuranceAccepted?.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">💳 Insurance Accepted</h2>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                {facility.insuranceAccepted.map((ins, i) => <li key={i}>{ins}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}