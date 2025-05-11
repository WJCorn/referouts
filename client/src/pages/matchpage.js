import React, { useState } from 'react';

function MatchPage() {
  const [zip, setZip] = useState('');
  const [insurance, setInsurance] = useState('');
  const [level, setLevel] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/referrals/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zip, insurance, level })
    });
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Find Matching Treatment Centers</h2>
      <input placeholder="ZIP code" value={zip} onChange={e => setZip(e.target.value)} /><br />
      <input placeholder="Insurance" value={insurance} onChange={e => setInsurance(e.target.value)} /><br />
      <input placeholder="Level of care" value={level} onChange={e => setLevel(e.target.value)} /><br />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <strong>{r.name}</strong> – {r.city}, {r.state}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchPage;
