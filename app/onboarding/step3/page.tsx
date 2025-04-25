'use client';


import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep3() {
  const router = useRouter();
  const { setOnboardingInfo } = useOnboardingStore();

  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);

  const handlePrevious = () => {
    router.push('/onboarding/step2');
  };

  const handleNext = () => {
    if (selectedFeeling) setOnboardingInfo({ selectedFeeling });
    router.push('/onboarding/step4');
  };

  const feelingOptions = ['추웠어', '적당했어', '더웠어'];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        오늘 입은 옷 어땠어?
      </p>
      <div className="space-y-4 w-full max-w-xs">
        {feelingOptions.map((label, index) => (
          <Button
            key={index}
            value={index}
            onClick={() => setSelectedFeeling(index)}
            className={`w-full py-3 rounded-lg shadow-md ${
              selectedFeeling === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-xs mt-6 space-x-4">
        <Button
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          onClick={handlePrevious}
        >
          이전
        </Button>
        <Button
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleNext}
          disabled={selectedFeeling === null}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default OnboardingStep3;
