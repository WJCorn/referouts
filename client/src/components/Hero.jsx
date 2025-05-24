export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-serif font-semibold">
        Smarter Referrals. <br /> Better Outcomes.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-gray-600">
        Connect your care teams with the right partners—instantly.
      </p>
      <button className="mt-8 bg-teal-800 text-white px-6 py-3 rounded hover:bg-teal-700 transition">
        Request Early Access
      </button>
    </section>
  );
}