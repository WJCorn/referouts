export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Referouts</h1>
      <p className="text-lg text-gray-600 mb-6">We're building something amazing. Stay tuned!</p>
      <p className="text-sm text-gray-400">© {new Date().getFullYear()} Referouts, All rights reserved.</p>
    </div>
  );
}