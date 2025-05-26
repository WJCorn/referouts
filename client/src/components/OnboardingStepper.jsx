export default function OnboardingStepper({ currentStep }) {
  const steps = [
    'Confirm Account',
    'Find or Create Facility',
    'Add Services & Tags',
    'Review & Submit'
  ];

  return (
    <div className="flex justify-between mb-8 px-2 text-sm">
      {steps.map((label, index) => {
        const isActive = index + 1 === currentStep;
        const isComplete = index + 1 < currentStep;

        return (
          <div key={label} className="flex-1 text-center relative">
            <div className={`w-8 h-8 mx-auto rounded-full border-2 ${isActive ? 'border-blue-600 bg-blue-600 text-white' : isComplete ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-white text-gray-500'} flex items-center justify-center`}>
              {isComplete ? '✓' : index + 1}
            </div>
            <div className="mt-2 text-xs sm:text-sm">{label}</div>
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-full w-full h-0.5 bg-gray-300 z-[-1]"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}