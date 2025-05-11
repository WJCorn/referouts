import React, { useState } from 'react';

function SubmitPage() {
  const [form, setForm] = useState({
    name: '',
    state: '',
    insurances: '',
    levels: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/providers/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const result = await res.json();
    alert(result.message || 'Submitted!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submit Your Treatment Center</h2>
      <input name="name" placeholder="Facility Name" value={form.name} onChange={handleChange} /><br />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} /><br />
      <input name="insurances" placeholder="Insurances (comma separated)" value={form.insurances} onChange={handleChange} /><br />
      <input name="levels" placeholder="Levels of Care (comma separated)" value={form.levels} onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SubmitPage;
