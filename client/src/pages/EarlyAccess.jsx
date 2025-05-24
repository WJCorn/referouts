import { useState } from 'react';
import axios from 'axios';

export default function EarlyAccess() {
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await axios.post('/api/early-signup', form);
      setStatus('success');
      setForm({ name: '', organization: '', email: '', phone: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6">Request Early Access</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="organization"
          type="text"
          placeholder="Organization"
          required
          value={form.organization}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
        >
          Submit
        </button>
      </form>

      {status === 'success' && (
        <p className="text-green-600 mt-4">Thanks! We’ll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}