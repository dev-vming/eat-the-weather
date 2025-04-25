'use client';

import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep2() {
  const router = useRouter();
  const { setOnboardingInfo } = useOnboardingStore();

  const [selectedClothes, setSelectedClothes] = useState<number | null>(null);

  const handlePrevious = () => {
    router.push('/onboarding/step1');
  };

  const handleNext = () => {
    if (selectedClothes) setOnboardingInfo({ selectedClothes });
    router.push('/onboarding/step3');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        오늘 네가 입은 옷을 알려줘!
      </p>
      <div className="space-y-4 w-full max-w-xs">
        {[
          '민소매, 반팔, 반바지',
          '얇은 셔츠, 면바지',
          '자켓, 트렌치코트, 얇은 니트',
          '패딩, 기모바지, 내복, 두꺼운 니트',
        ].map((label, index) => (
          <Button
            key={index}
            value={index}
            onClick={() => setSelectedClothes(index)}
            className={`w-full py-3 rounded-lg shadow-md ${
              selectedClothes === index
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
          disabled={selectedClothes === null}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default OnboardingStep2;
