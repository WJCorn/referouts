// src/components/Networking.jsx
import { motion } from 'framer-motion';
import networkGraphic from '../assets/network-graphic.png'; // Placeholder for future infographic

export default function Networking() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Build Strategic Partnerships
          </h2>
          <p className="text-lg leading-relaxed">
            When a preferred partner isn’t available, ReferOuts provides smart suggestions for other
            facilities to contact. These suggestions are based on your business needs, location, level
            of care, and prior patterns.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            This creates real opportunities to grow your referral network, discover previously unknown
            providers, and turn one-time redirects into lasting partnerships.
          </p>

          <p className="mt-4 text-lg leading-relaxed">
            Providers can also showcase their services, boosting visibility and letting others discover
            them when relevant needs arise. It’s B2B networking — built into your daily workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img
            src={networkGraphic}
            alt="Referral networking diagram"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}