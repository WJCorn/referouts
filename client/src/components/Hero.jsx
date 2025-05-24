import { motion } from 'framer-motion';

export default function Hero() {
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
        className="mt-6 max-w-xl text-lg text-gray-600"
      >
        Connect your care teams with the right partners—instantly.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 bg-teal-800 text-white px-6 py-3 rounded hover:bg-teal-700 transition"
      >
        Request Early Access
      </motion.button>
    </section>
  );
}