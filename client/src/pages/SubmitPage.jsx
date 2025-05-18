import { useState, useRef } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    state: "",
    insurances: "",
    levelsOfCare: ""
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error
  const topRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");
    topRef.current?.scrollIntoView({ behavior: "smooth" });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/providers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "✅ Submitted successfully");
        setForm({ name: "", state: "", insurances: "", levelsOfCare: "" });
      } else {
        setStatus("error");
        setMessage(data.message || "❌ Submission failed");
      }
    } catch (err) {
      console.error("❌ Error submitting:", err);
      setStatus("error");
      setMessage("❌ Network error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div ref={topRef}></div>
      <h1 className="text-2xl font-bold mb-4">Submit Your Facility</h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded text-white ${
            status === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Facility Name"
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State (e.g., FL)"
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          name="insurances"
          value={form.insurances}
          onChange={handleChange}
          placeholder="Accepted Insurances (comma-separated)"
          className="w-full border p-2"
        />
        <input
          type="text"
          name="levelsOfCare"
          value={form.levelsOfCare}
          onChange={handleChange}
          placeholder="Levels of Care (comma-separated)"
          className="w-full border p-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}