import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditFacility() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/facilities/${id}`);
        const data = await res.json();
        setFacility(data);
      } catch (err) {
        console.error('Error fetching facility:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (name, value) => {
    setFacility(prev => ({
      ...prev,
      [name]: value.split(',').map(s => s.trim()).filter(Boolean)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/facilities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facility)
      });

      if (res.ok) {
        setStatus('Saved!');
        navigate('/admin');
      } else {
        setStatus('Failed to save');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error saving');
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!facility) return <p className="p-10">Facility not found.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Facility</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={facility.name || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Facility Name"
          required
        />
        <input
          name="address.street"
          value={facility.address?.street || ''}
          onChange={(e) =>
            setFacility(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))
          }
          className="border p-2 rounded w-full"
          placeholder="Street"
        />
        <input
          name="address.city"
          value={facility.address?.city || ''}
          onChange={(e) =>
            setFacility(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))
          }
          className="border p-2 rounded w-full"
          placeholder="City"
        />
        <input
          name="address.state"
          value={facility.address?.state || ''}
          onChange={(e) =>
            setFacility(prev => ({
              ...prev,
              address: { ...prev.address, state: e.target.value }
            }))
          }
          className="border p-2 rounded w-full"
          placeholder="State"
        />
        <input
          name="address.zip"
          value={facility.address?.zip || ''}
          onChange={(e) =>
            setFacility(prev => ({
              ...prev,
              address: { ...prev.address, zip: e.target.value }
            }))
          }
          className="border p-2 rounded w-full"
          placeholder="ZIP"
        />

        <input
          name="email"
          value={facility.email || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Email"
        />
        <input
          name="phone"
          value={facility.phone || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Phone"
        />
        <input
          name="website"
          value={facility.website || ''}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Website"
        />

        <input
          name="insuranceAccepted"
          value={facility.insuranceAccepted?.join(', ') || ''}
          onChange={(e) => handleArrayChange('insuranceAccepted', e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Insurances (comma separated)"
        />
        <input
          name="levelsOfCare"
          value={facility.levelsOfCare?.join(', ') || ''}
          onChange={(e) => handleArrayChange('levelsOfCare', e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Levels of Care (comma separated)"
        />
        <input
          name="services"
          value={facility.services?.join(', ') || ''}
          onChange={(e) => handleArrayChange('services', e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Services (comma separated)"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        {status && <p className="text-sm mt-2 text-gray-500">{status}</p>}
      </form>
    </div>
  );
}