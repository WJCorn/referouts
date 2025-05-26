// src/pages/Onboarding.jsx
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export default function Onboarding() {
  const { user } = useUser();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Prefetch user or prepare onboarding step state here if needed
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.firstName}!</h1>
      <p className="mb-6">Let’s get you set up with Referouts.</p>

      <div className="border p-6 rounded-xl bg-white shadow dark:bg-gray-900">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 1: Account Info</h2>
            <p className="text-gray-500 mb-4">We’ve got your login — now let’s link your provider profile.</p>
            {/* Placeholder for form */}
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 2: Facility Matching</h2>
            <p className="text-gray-500 mb-4">Do you see your facility in our records?</p>
            {/* Facility matching UI here */}
          </div>
        )}
      </div>
    </div>
  );
}