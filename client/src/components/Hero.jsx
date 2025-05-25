import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function Hero() {
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
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Motion radial background */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        viewBox="0 0 800 800"
        className="absolute top-0 left-0 w-[120%] h-[120%] transform -translate-x-1/4 -translate-y-1/4 z-0"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="400" fill="url(#bgGradient)" />
      </motion.svg>

      {/* Optional floating blur orb */}
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-200 dark:bg-teal-900 rounded-full blur-3xl opacity-20 z-0"
        initial={{ y: 30 }}
        animate={{ y: -30 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Main content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-serif font-semibold leading-tight text-gray-900 dark:text-white max-w-3xl z-10"
      >
        Smarter Referrals. <br /> Better Outcomes.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300 z-10"
      >
        Connect your care teams with the right partners—instantly.
      </motion.p>

      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 space-y-4 max-w-md w-full text-left z-10"
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
              Request Early Access
            </button>
          </motion.form>
        )}

        {submitted && (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 text-green-600 text-lg z-10"
          >
            🎉 You're on the early access list. We'll be in touch soon!
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 mt-4 z-10"
        >
          {error}
        </motion.p>
      )}
    </section>
  );
}