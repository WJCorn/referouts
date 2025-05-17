import { useState } from "react";

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    state: "",
    insurances: "",
    levelsOfCare: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const body = {
      name: form.name,
      state: form.state,
      insurances: form.insurances.split(",").map(i => i.trim()),
      levelsOfCare: form.levelsOfCare.split(",").map(l => l.trim()),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/providers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setForm({ name: "", state: "", insurances: "", levelsOfCare: "" });
      setStatus("✅ Submitted successfully!");
    } catch (err) {
      console.error("❌ Submission error:", err);
      setStatus("❌ Error submitting. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Provider</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Facility Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="insurances"
          placeholder="Insurances (comma-separated)"
          value={form.insurances}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="levelsOfCare"
          placeholder="Levels of Care (comma-separated)"
          value={form.levelsOfCare}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
