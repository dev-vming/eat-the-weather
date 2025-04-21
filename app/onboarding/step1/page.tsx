'use client';

import ChoiceButton from '@/app/components/ChoiceButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep1() {
  const router = useRouter();
  const { setTempUser } = useUserStore();

  // TODO : 모든 지역 정보 받아오는 API 필요
  // TODO : 선택한 지역 기온 정보 받아오는 API 필요
  const regions = ['지역1', '지역2', '지역3', '지역4', '지역5'];

  const [selectedRegion, setSelectedRegion] = useState('');

  const handlePrevious = () => {
    router.push('/onboarding');
  };

  const handleNext = () => {
    setTempUser({ selectedRegion });
    router.push('/onboarding/step2');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        날씨를 불러올 지역을 알려줘! 
      </p>
      <Select
        value={selectedRegion}
        onValueChange={(value) => setSelectedRegion(value)}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="지역명" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region, index) => (
            <SelectItem key={index} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-between w-full max-w-xs mt-8 space-x-4">
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

export default OnboardingStep1;
