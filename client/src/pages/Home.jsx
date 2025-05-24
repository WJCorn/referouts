import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
