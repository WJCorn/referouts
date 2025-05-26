import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 py-10 border-t bg-white dark:bg-gray-900 dark:text-gray-400">
      <div className="space-x-4">
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
      </div>
      <p className="mt-2">&copy; {new Date().getFullYear()} Referouts, Inc.</p>
    </footer>
  );
}
// This component renders the footer with links to Privacy Policy, Contact, and Terms of Service pages.