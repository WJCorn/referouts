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
      setTimeout(() => setShowForm(false), 1000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const inputStyles =
    'w-full px-4 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500';

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Blurred blob backgrounds */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-teal-300 dark:bg-teal-900 rounded-full blur-3xl opacity-30 z-0"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-20 z-0"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

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

      {!submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 z-10"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition"
          >
            {showForm ? 'Close Form' : 'Request Early Access'}
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && !submitted && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-4 max-w-md w-full text-left z-10"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              required
              value={form.organization}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputStyles}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className={inputStyles}
            />
            <button
              type="submit"
              className="w-full bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
            >
              Submit
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