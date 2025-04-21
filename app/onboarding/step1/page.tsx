'use client';

import ChoiceButton from '@/app/components/ChoiceButton';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function OnboardingStep1() {
  const router = useRouter();
  const { setTempUser } = useUserStore();

  const [selectedClothes, setSelectedClothes] = useState(0);

  const handlePrevious = () => {
    router.push('/onboarding');
  };

  const handleNext = () => {
    setTempUser({selectedClothes});
    router.push('/onboarding/step2');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-center text-lg font-semibold mb-6">
        오늘 네가 입은 옷을 알려줘!
      </p>
      <div className="space-y-4 w-full max-w-xs" >
        <ChoiceButton onClick={()=>setSelectedClothes(0)} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          민소매, 반팔, 반바지
        </ChoiceButton>
        <ChoiceButton value={1} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          얇은 셔츠, 면바지
        </ChoiceButton>
        <ChoiceButton value={2} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          자켓, 트렌치코트, 얇은 니트
        </ChoiceButton>
        <ChoiceButton value={3} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">
          패딩, 기모바지, 내복, 두꺼운 니트
        </ChoiceButton>
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

export default OnboardingStep1;
