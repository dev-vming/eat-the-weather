'use client';

import { RegionSearchCombobox } from '@/app/components/RegionSearchComboBox';
import { Button } from '@/components/ui/button';
import { Region } from '@/domain/entities/Region';
import { useCurrentWeather } from '@/lib/hooks/useWeather';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep1() {
  const router = useRouter();
  const { setOnboardingInfo } = useOnboardingStore();

  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(
    undefined
  );
  const { data } = useCurrentWeather(selectedRegion?.lat, selectedRegion?.lon);
  const temperature = data && Math.round(data.main.temp);

  const handlePrevious = () => {
    router.push('/onboarding');
  };

  const handleNext = () => {
    setOnboardingInfo({ selectedRegion, currTemperature: temperature });
    router.push('/onboarding/step2');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        날씨를 불러올 지역을 알려줘!
      </p>
      <RegionSearchCombobox
        value={selectedRegion}
        onChange={setSelectedRegion}
      />
      <div className="flex justify-between w-full max-w-xs mt-8 space-x-4">
        <Button
          className="cursor-pointer flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          onClick={handlePrevious}
        >
          이전
        </Button>
        <Button
          className="cursor-pointer flex-1 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleNext}
          disabled={selectedRegion === undefined}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default OnboardingStep1;
