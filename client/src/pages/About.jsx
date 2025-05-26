// src/components/About.jsx
import { motion } from 'framer-motion';
import demoImage from '../assets/referral-flow.png';

export default function About() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Revolutionizing Behavioral Health Referrals
          </h2>
          <p className="text-lg leading-relaxed">
            ReferOuts is a next-generation referral matching engine designed for treatment centers and call
            centers in the behavioral health space. Our mission is to modernize how teams respond to inquiries
            they can’t serve directly — transforming missed opportunities into reliable outcomes.
          </p>
          <p className="mt-6 text-lg leading-relaxed">
            With ReferOuts, call reps can instantly search a vetted directory of external facilities based on
            level of care, accepted insurance, location, and more — all backed by customizable logic. 
            Administrators can fine-tune routing behavior and maintain full visibility into
            every outbound referral.
          </p>
          <p className="mt-6 text-lg leading-relaxed">
            Whether you're building a care network, trying to reduce call churn, or wanting to help more people, 
            ReferOuts provides the infrastructure and flexibility you need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={demoImage}
            alt="Referral Workflow"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}