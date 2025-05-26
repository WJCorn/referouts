import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers/${id}`);
        const data = await res.json();
        setProvider(data);

        const res2 = await fetch(`${import.meta.env.VITE_API_BASE}/facilities?providerId=${id}`);
        const linkedFacilities = await res2.json();
        setFacilities(linkedFacilities);

        if (isSignedIn) {
          const token = await getToken();
          const userRes = await fetch(`${import.meta.env.VITE_API_BASE}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const userData = await userRes.json();
          setUserRole(userData.role);
        }
      } catch (err) {
        console.error('Error fetching provider or facilities:', err);
      }
    };

    fetchProvider();
  }, [id, isSignedIn, getToken]);

  const handleUnlink = async (facilityId) => {
    const confirmed = window.confirm("Are you sure you want to unlink this facility?");
    if (!confirmed) return;

    await fetch(`${import.meta.env.VITE_API_BASE}/facilities/${facilityId}/link`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId: null })
    });

    setFacilities(prev => prev.filter(f => f._id !== facilityId));
  };

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

        {/* Sub-Facilities (parentNetwork-style) */}
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

        {/* Linked Facilities */}
        {facilities.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">🏥 Linked Facilities</h2>
              <span className="text-sm text-gray-500">{facilities.length} facility{facilities.length > 1 ? 'ies' : 'y'} linked</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map(fac => (
                <div
                  key={fac._id}
                  className="p-5 border rounded-2xl hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{fac.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {fac.address?.city}, {fac.address?.state}
                  </p>

                  <div className="flex flex-wrap gap-1 text-xs mb-2">
                    {fac.levelsOfCare?.map((lvl, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{lvl}</span>
                    ))}
                    {fac.services?.map((svc, i) => (
                      <span key={`svc-${i}`} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{svc}</span>
                    ))}
                    {fac.insuranceAccepted?.map((ins, i) => (
                      <span key={`ins-${i}`} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{ins}</span>
                    ))}
                  </div>

                  <a
                    href={`/facility/${fac._id}`}
                    className="text-blue-600 text-sm hover:underline block mb-2"
                  >
                    View Facility →
                  </a>

                  {userRole === 'admin' && (
                    <button
                      onClick={() => handleUnlink(fac._id)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Unlink
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}