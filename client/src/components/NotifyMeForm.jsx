import { useState } from 'react';
import axios from 'axios';

export default function NotifyMeForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('/api/notify', { email });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
      <input
        type="email"
        placeholder="your@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
      />
      <button
        type="submit"
        className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
      >
        Notify Me
      </button>
      {submitted && <p className="text-green-600 mt-2">You're on the list!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}