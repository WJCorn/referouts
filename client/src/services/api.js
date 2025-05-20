const API_BASE = import.meta.env.VITE_API_BASE_URL;

app.use('/api/early-signup', require('./routes/earlySignup'));

export const getReferrals = async (query) => {
  const res = await fetch(`${API_BASE}/api/referrals?${new URLSearchParams(query)}`);
  if (!res.ok) throw new Error('Failed to fetch referrals');
  return res.json();
};

export const seedProviders = async () => {
  const res = await fetch(`${API_BASE}/api/seed`);
  if (!res.ok) throw new Error('Seed failed');
  return res.json();
};