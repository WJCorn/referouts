import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProvider() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error('Error fetching provider:', err);
        setStatus('Failed to load provider');
      }
    };
    fetchProvider();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultiInput = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(',').map((s) => s.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Saved!');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        const err = await res.json();
        setStatus(err.message || 'Save failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error.');
    }
  };

  if (!formData) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-4">✏️ Edit Provider</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Provider Name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="logoUrl" placeholder="Logo URL" value={formData.logoUrl} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full border rounded px-3 py-2" />

        {/* Address */}
        <div className="grid grid-cols-2 gap-2">
          <input type="text" name="address.street" placeholder="Street" value={formData.address?.street || ''} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.city" placeholder="City" value={formData.address?.city || ''} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.state" placeholder="State" value={formData.address?.state || ''} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.zip" placeholder="ZIP" value={formData.address?.zip || ''} onChange={handleChange} className="border rounded px-3 py-2" />
        </div>

        {/* Multi fields */}
        <input type="text" name="insuranceAccepted" placeholder="Insurance Accepted (comma-separated)" value={(formData.insuranceAccepted || []).join(', ')} onChange={(e) => handleMultiInput('insuranceAccepted', e.target.value)} className="w-full border rounded px-3 py-2" />
        <input type="text" name="levelsOfCare" placeholder="Levels of Care (comma-separated)" value={(formData.levelsOfCare || []).join(', ')} onChange={(e) => handleMultiInput('levelsOfCare', e.target.value)} className="w-full border rounded px-3 py-2" />
        <input type="text" name="services" placeholder="Tags / Labels (comma-separated)" value={(formData.services || []).join(', ')} onChange={(e) => handleMultiInput('services', e.target.value)} className="w-full border rounded px-3 py-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isNetwork" checked={formData.isNetwork || false} onChange={(e) => setFormData(prev => ({ ...prev, isNetwork: e.target.checked }))} />
          This is a network provider
        </label>

        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Save</button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}