import { useState } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/early-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus(data.message || "error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-semibold mb-4">Referouts</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Smarter Referrals. Better Outcomes.<br />
          We’re launching soon.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your work email"
            className="px-4 py-2 rounded w-full sm:w-80 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Notify Me"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-green-400">Thanks! We'll be in touch soon.</p>
        )}
        {status && status !== "success" && status !== "loading" && (
          <p className="mt-4 text-red-400">{status}</p>
        )}
      </div>
    </div>
  );
}