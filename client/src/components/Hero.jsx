import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('/api/early-signup', form);
      setSubmitted(true);
      setForm({ name: '', organization: '', email: '', phone: '' });

      // Close form after short delay
      setTimeout(() => {
        setShowForm(false);
      }, 500); // sync with exit animation
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-serif font-semibold"
      >
        Smarter Referrals. <br /> Better Outcomes.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300"
      >
        Connect your care teams with the right partners—instantly.
      </motion.p>

      {!showForm && !submitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={() => {
            setShowForm(true);
            setSubmitted(false);
          }}
          className="mt-8 bg-teal-800 text-white px-6 py-3 rounded hover:bg-teal-700 transition"
        >
          Request Early Access
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {showForm && !submitted && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-4 max-w-md w-full text-left"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              required
              value={form.organization}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </motion.form>
        )}

        {submitted && !showForm && (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 text-green-600 text-lg"
          >
            🎉 You're on the early access list. We'll be in touch soon!
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 mt-4"
        >
          {error}
        </motion.p>
      )}
    </section>
  );
}