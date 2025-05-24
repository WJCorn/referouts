export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 py-10 border-t bg-white dark:bg-gray-900 dark:text-gray-400">
      <div className="space-x-4">
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/terms" className="hover:underline">Terms</a>
      </div>
      <p className="mt-2">&copy; {new Date().getFullYear()} Referouts, Inc.</p>
    </footer>
  );
}