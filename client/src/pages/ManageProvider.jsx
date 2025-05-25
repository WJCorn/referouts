import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ManageProvider() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');

  useEffect(() => {
    fetch(`/admin/providers/${id}`)
      .then(res => res.json())
      .then((data) => {
        setProvider(data.provider);
        setFacilities(data.facilities);
      });

    fetch('/facilities') // Adjust if your GET /facilities route is different
      .then((res) => res.json())
      .then(setAllFacilities);
  }, [id]);

  const handleLink = async () => {
    await fetch(`/admin/providers/${id}/link-facility`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ facilityId: selectedFacility })
    });
    window.location.reload();
  };

  const handleUnlink = async (facilityId) => {
    await fetch(`/admin/facilities/${facilityId}/unlink`, {
      method: 'PUT'
    });
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Provider</h1>
      <p className="mb-6 text-lg font-medium text-gray-700 dark:text-gray-300">{provider?.name}</p>

      <div className="mb-6">
        <label className="block font-medium mb-2">Link a Facility</label>
        <select
          className="border rounded px-4 py-2 w-full"
          onChange={(e) => setSelectedFacility(e.target.value)}
          value={selectedFacility}
        >
          <option value="">-- Select Facility --</option>
          {allFacilities.filter(f => !f.parentNetwork).map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleLink}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Link Facility
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Linked Facilities</h2>
      <ul className="space-y-3">
        {facilities.map((f) => (
          <li key={f._id} className="bg-gray-50 dark:bg-gray-800 border rounded p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-sm text-gray-500">{f.address?.city}, {f.address?.state}</div>
            </div>
            <button
              onClick={() => handleUnlink(f._id)}
              className="text-red-600 text-sm hover:underline"
            >
              Unlink
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}