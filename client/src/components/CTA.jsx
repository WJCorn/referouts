import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('/api/early-signup', { email });
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <section id="cta" className="py-20 text-center px-6 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-xl mb-4 text-gray-900 dark:text-white">
          Be the first to transform your referral flow
        </p>

        {submitted ? (
          <p className="text-green-600 dark:text-green-400 font-semibold">
            Thanks! You’re on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-teal-800 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
            >
              Notify Me
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
        )}
      </motion.div>
    </section>
  );
}