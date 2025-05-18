export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
        ReferOuts.
      </h1>
      <p className="text-lg md:text-2xl text-gray-400 max-w-xl mb-8">
        A smarter way to route referrals and find care. We're launching soon.
      </p>
      <button
        className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition"
        onClick={() => window.location.href = "mailto:info@referouts.com"}
      >
        Notify Me
      </button>
      <footer className="absolute bottom-6 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Referouts, All rights reserved.
      </footer>
    </div>
  );
}
