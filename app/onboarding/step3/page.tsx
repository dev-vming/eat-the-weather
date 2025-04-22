'use client';

import ChoiceButton from '@/app/components/ChoiceButton';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep3() {
  const router = useRouter();
  const { setTempUser } = useUserStore();

  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);

  const currTemperature = useUserStore(
    (state) => state.onboardingInfo.currTemperature
  );
  const selectedClothes = useUserStore(
    (state) => state.onboardingInfo.selectedClothes
  );

  // 이전 온보딩에서 받아온 기온과 옷차림 정보로 적합도 계산
  const getWeatherFit = (temperature: number, clothes: number): number => {
    if (clothes === 0) return temperature >= 23 ? 0 : -1;
    if (clothes === 1) return temperature < 15 ? -1 : temperature > 22 ? 1 : 0;
    if (clothes === 2) return temperature < 6 ? -1 : temperature > 14 ? 1 : 0;
    if (clothes === 3) return temperature <= 15 ? 0 : 1;
    return 0;
  };
  
  // weatherFit과 selectedFeeling으로 민감도 계산
  const calculateTemperatureSensitivity = (
    feeling: number | null,
    fit: number
  ): number => {
    if (feeling === null) return 0;
    if (feeling === fit) return 0;
    if (feeling === 0) return fit * -1;
    return feeling;
  };
  
  const weatherFit = getWeatherFit(currTemperature, selectedClothes);
  const temperature_sensitivity = calculateTemperatureSensitivity(selectedFeeling, weatherFit);

  const handlePrevious = () => {
    router.push('/onboarding/step2');
  };

  const handleNext = () => {
    setTempUser({ temperature_sensitivity });
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
