import { motion } from 'framer-motion';
import { Ban, CheckCircle, Timer } from 'lucide-react';

const features = [
  {
    title: "Inefficient referrals",
    desc: "Say goodbye to manual, time-consuming processes",
    icon: <Ban size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "Streamlined matching",
    desc: "Find the best providers for your patients’ needs",
    icon: <CheckCircle size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "Automated tracking",
    desc: "Monitor referral progress from start to finish",
    icon: <Timer size={32} className="text-teal-800 mx-auto mb-4" />,
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-serif mb-12"
      >
        How It Works
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map(({ title, desc, icon }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            {icon}
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}