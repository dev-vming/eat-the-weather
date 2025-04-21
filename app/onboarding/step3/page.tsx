'use client';

import ChoiceButton from '@/app/components/ChoiceButton';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep3() {
  const router = useRouter();
  const { setTempUser } = useUserStore();

  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);

  // TODO : 선택한 지역의 기온과 옷차림 비교 , 체감 온도와 비교해서 민감도 설정

  const handlePrevious = () => {
    router.push('/onboarding/step2');
  };

  const handleNext = () => {
    setTempUser({ temperature_sensitivity : 0 });
    router.push('/onboarding/step4');
  };

  const feelingOptions = ['더웠어', '적당했어', '추웠어'];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        오늘 입은 옷 어땠어?
      </p>
      <div className="space-y-4 w-full max-w-xs">
        {feelingOptions.map((label, index) => (
          <ChoiceButton
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
          </ChoiceButton>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-xs mt-6 space-x-4">
        <ChoiceButton
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          onClick={handlePrevious}
        >
          이전
        </ChoiceButton>
        <ChoiceButton
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleNext}
        >
          다음
        </ChoiceButton>
      </div>
    </div>
  );
}

export default OnboardingStep3;
