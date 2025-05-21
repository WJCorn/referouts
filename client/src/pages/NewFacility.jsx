import { useState, useEffect } from 'react';

export default function NewFacility() {
  const [formData, setFormData] = useState({
    parentNetwork: '',
    name: '',
    logoUrl: '',
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
    services: ''
  });

  const [providers, setProviders] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/providers`);
        const data = await res.json();
        const networks = data.filter(p => p.isNetwork);
        setProviders(networks);
      } catch (err) {
        console.error('Failed to fetch providers:', err);
      }
    };
    fetchProviders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      insuranceAccepted: formData.insuranceAccepted.split(',').map(s => s.trim()),
      levelsOfCare: formData.levelsOfCare.split(',').map(s => s.trim()),
      services: formData.services.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/facilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({
          parentNetwork: '',
          name: '',
          logoUrl: '',
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
          services: ''
        });
      } else {
        setStatus(result.error || 'Error submitting form');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">📍 Add a New Facility</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Parent Network */}
        <div>
          <label className="block text-sm mb-1">Select Parent Network</label>
          <select
            name="parentNetwork"
            value={formData.parentNetwork}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Select a Network --</option>
            {providers.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Facility Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm mb-1">Logo URL</label>
          <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm mb-1">Contact Email</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Website</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-1">Address</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} className="border rounded px-3 py-2" />
            <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} className="border rounded px-3 py-2" />
            <input type="text" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} className="border rounded px-3 py-2" />
            <input type="text" name="address.zip" placeholder="ZIP" value={formData.address.zip} onChange={handleChange} className="border rounded px-3 py-2" />
          </div>
        </div>

        {/* Services & Insurance */}
        <div>
          <label className="block text-sm mb-1">Insurance Accepted (comma-separated)</label>
          <input type="text" name="insuranceAccepted" value={formData.insuranceAccepted} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Levels of Care (comma-separated)</label>
          <input type="text" name="levelsOfCare" value={formData.levelsOfCare} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Services (comma-separated)</label>
          <input type="text" name="services" value={formData.services} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Submit Facility
        </button>

        {status && (
          <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {status === 'success' ? '✅ Facility submitted!' : `❌ ${status}`}
          </p>
        )}
      </form>
    </div>
  );
}