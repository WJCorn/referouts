import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import OnboardingStepper from '../components/OnboardingStepper';

export default function Onboarding() {
  const { user } = useUser();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Optional: Load current step from DB or localStorage
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.firstName}!</h1>
      <p className="mb-6">Let’s get you set up with Referouts.</p>

      <OnboardingStepper currentStep={step} />

      <div className="border p-6 rounded-xl bg-white shadow dark:bg-gray-900">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 1: Account Info</h2>
            <p className="text-gray-500 mb-4">
              We’ve got your login — now let’s link your provider profile.
            </p>
            {/* Placeholder for account-related form */}
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
            {/* TODO: Facility search + claim/create UI */}
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 3: Services & Tags</h2>
            <p className="text-gray-500 mb-4">What services and programs does your facility offer?</p>
            {/* TODO: Multi-select inputs for services */}
            <button
              onClick={() => setStep(4)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 4: Review & Submit</h2>
            <p className="text-gray-500 mb-4">Double check your info before submitting for review.</p>
            {/* TODO: Final review summary */}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                // Final submission logic here
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}