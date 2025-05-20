import { useState } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Email not sent");

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          ReferOuts
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10">
          A smarter way to route referrals and find care.
          <br className="hidden md:inline" />
          Signup for early access.
        </p>

        {/* Early Access Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            alert(`You're on the early access list, ${email}`);
            e.target.reset();
          }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Business email"
            required
            className="w-full sm:w-80 px-5 py-3 bg-black border border-gray-700 text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            Request Access
          </button>
        </form>

        <p className="mt-14 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Referouts. All rights reserved.
        </p>
      </div>
    </div>
  );
}