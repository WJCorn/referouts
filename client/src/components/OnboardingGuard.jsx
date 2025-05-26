// src/components/OnboardingGuard.jsx
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function OnboardingGuard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/users/${user.id}`);
        const data = await res.json();
        if (!data.isOnboardingComplete) {
          navigate('/onboarding');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) checkUser();
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;

  return <Outlet />;
}