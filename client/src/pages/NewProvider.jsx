import { useState } from 'react';

export default function NewProvider() {
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    description: '',
    contactEmail: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    insuranceAccepted: '',
    levelsOfCare: '',
    services: '',
    isNetwork: false
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      insuranceAccepted: formData.insuranceAccepted.split(',').map(s => s.trim()),
      levelsOfCare: formData.levelsOfCare.split(',').map(s => s.trim()),
      services: formData.services.split(',').map(s => s.trim()),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus(data.message || 'Error creating provider.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">🏢 Create a New Provider</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="name" placeholder="Provider Name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="logoUrl" placeholder="Logo URL" value={formData.logoUrl} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        
        <div className="grid grid-cols-2 gap-2">
          <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} className="border rounded px-3 py-2" />
          <input type="text" name="address.zip" placeholder="ZIP" value={formData.address.zip} onChange={handleChange} className="border rounded px-3 py-2" />
        </div>

        <input type="text" name="insuranceAccepted" placeholder="Insurance (comma-separated)" value={formData.insuranceAccepted} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="levelsOfCare" placeholder="Levels of Care (comma-separated)" value={formData.levelsOfCare} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        <input type="text" name="services" placeholder="Services (comma-separated)" value={formData.services} onChange={handleChange} className="w-full border rounded px-3 py-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="isNetwork" checked={formData.isNetwork} onChange={handleChange} />
          This provider is a network
        </label>

        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Submit Provider
        </button>

        {status === 'success' && (
          <p className="text-green-500 mt-3">✅ Provider created successfully!</p>
        )}
        {status && status !== 'success' && status !== 'loading' && (
          <p className="text-red-500 mt-3">❌ {status}</p>
        )}
      </form>
    </div>
  );
}