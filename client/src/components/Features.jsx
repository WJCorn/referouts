import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  Building2,
  FolderGit2,
  Users,
  Share2,
  Settings2,
} from 'lucide-react';

const features = [
  {
    title: "Smart Referral Matching",
    desc: "Accepts inputs like insurance, state, and level of care to suggest the most relevant facilities.",
    icon: <SlidersHorizontal size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "B2B Directory",
    desc: "All provider data is indexable for performance and geolocation matching.",
    icon: <FolderGit2 size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "Customizable Results Weighting",
    desc: "Designed to give businesses full control over what referral options appear.",
    icon: <Settings2 size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "Provider Profile Submission",
    desc: "Enables facilities to self-submit and maintain their own directory listing.",
    icon: <Building2 size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "Built for Call Centers",
    desc: "Primary use case supports call reps handling inbound inquiries when options are unavailable.",
    icon: <Users size={32} className="text-teal-800 mx-auto mb-4" />,
  },
  {
    title: "White-label Friendly",
    desc: "Architecture supports multi-tenant licensing and isolated deployments.",
    icon: <Share2 size={32} className="text-teal-800 mx-auto mb-4" />,
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
        Features
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
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
            <p className="text-gray-600 dark:text-gray-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}